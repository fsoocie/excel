import {DomListener} from '@core/DomListener';


export class ExcelComponent extends DomListener {
  constructor($el, options = {}) {
    super($el, options);
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
