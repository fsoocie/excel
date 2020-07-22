import $ from '@core/Dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {preventDefault} from '@core/utils';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.subscriber = new StoreSubscriber(options.store)
    this.emitter = new Emitter()
    this.store = options.store
  }

  getRoot() {
    const options = {
      emitter: this.emitter,
      store: this.store
    }
    const $root = $.create('div', 'excel')
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, options)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  initial() {
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => {
      component.init()
    })
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }
  }
  destroy() {
    this.components.forEach(component => component.destroy())
    this.subscriber.unsubscribeComponents()
    document.removeEventListener('oncontextmenu', preventDefault)
  }
}
