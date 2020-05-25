import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizingHandler} from '@/components/table/resizing.table';
import {isCell, matrix, shouldResize, nextSelector} from './table.functions';
import {TableSelection} from '@/components/table/Table.Selection';
import $ from '@core/Dom';

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
    return createTable()
  }
  prepare() {
    this.selection = new TableSelection()
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', (key) => {
      const id = this.selection.current.id(true)
      const $next = this.$root.find(`[data-id="${nextSelector(key, id)}"]`)
      this.selectCell($next)
    })
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizingHandler(this.$root, event)
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
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
