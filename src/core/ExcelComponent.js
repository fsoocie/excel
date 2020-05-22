import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options);
  }
  toHTML() {
    return ''
  }
  init() {
    this.initDomListeners()
  }
  disable() {
    this.disableDomListeners()
  }
}
