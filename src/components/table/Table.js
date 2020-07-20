import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizingHandler} from '@/components/table/resizing.table';
import {isCell, matrix, shouldResize, nextSelector} from './table.functions';
import {TableSelection} from '@/components/table/Table.Selection';
import $ from '@core/Dom';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.prepare()
  }
  toHTML() {
    return createTable(20, this.$getState())
  }
  prepare() {
    this.selection = new TableSelection()
  }
  selectCell($cell) {
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    this.$dispatch(actions.changeStyles(styles))
  }
  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateCurrentTextState(value)
    })
    this.$on('formula:done', key => {
      const id = this.selection.current.id(true)
      const $next = this.$root.find(`[data-id="${nextSelector(key, id)}"]`)
      this.selectCell($next)
    })
    this.$on('toolbar:applyStyles', style => {
      this.selection.applyStyles(style)
      this.$dispatch(actions.applyChanges({
        ids: this.selection.selectedIds,
        style
      }))
    })
  }
  async resize(event) {
    try {
      const data = await resizingHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(e.message)
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resize(event)
    }
    if (isCell(event)) {
      const $target = $(event.target)
      if (event.ctrlKey) this.selection.addSelect($target)
      else if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Tab',
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ]
    const key = event.key
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(`[data-id="${nextSelector(key, id)}"]`)
      this.selectCell($next)
    }
  }

  updateCurrentTextState(value) {
    this.$dispatch(actions.changeText({
      value,
      id: this.selection.current.id()
    }))
  }

  onInput(event) {
    this.updateCurrentTextState($(event.target).text())
  }
}
