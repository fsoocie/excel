import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions'
import $ from '@core/Dom';
import {ActiveRoute} from '@core/routing/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }
  toHTML() {
    const title = this.store.getState()['tableTitle'] || ''
    return `
      <input id="table-title" class="input" type="text" value="${title}"/>
      <div>
        <div data-button='delete' class="button">
          <span data-button='delete' class="material-icons">delete</span>
        </div>
        <div data-button='exit' class="button">
          <span data-button='exit' class="material-icons">exit_to_app</span>
        </div>
      </div>`
  }
  onInput(event) {
    const $target = $(event.target)
    if ($target.nativeId === 'table-title') {
      this.$dispatch(actions.changeTitle($target.value()))
    }
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'delete') {
      const submit = confirm('Вы действительно хотите удалить таблицу?')
      if (submit) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
