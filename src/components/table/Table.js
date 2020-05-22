import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizingHandler} from '@/components/table/resizing.table';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }
  toHTML() {
    return createTable()
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizingHandler(this.$root, event)
    }
  }
}
