import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options);
    this.emitter = options.emitter
    this.unsubscribers = []
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, ...args) {
    const unsub = this.emitter.subscribe(event, ...args)
    this.unsubscribers.push(unsub)
  }
  toHTML() {
    return ''
  }
  init() {
    this.initDomListeners()
  }
  destroy() {
    this.disableDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
