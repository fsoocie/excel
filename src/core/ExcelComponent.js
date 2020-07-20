import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options);
    this.emitter = options.emitter
    this.subscribers = options.subscribers || []
    this.unsubscribers = []
    this.store = options.store
    this.prepare()
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, ...args) {
    const unsub = this.emitter.subscribe(event, ...args)
    this.unsubscribers.push(unsub)
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  $getState() {
    return this.store.getState()
  }
  toHTML() {
    return ''
  }
  isWatching(key) {
    return this.subscribers.includes(key)
  }
  storeChanged(changes) {}
  prepare() {}
  init() {
    this.initDomListeners()
  }
  destroy() {
    this.disableDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
