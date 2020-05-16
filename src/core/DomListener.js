import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, options) {
    this.$root = $root
    this.listeners = options.listeners || []
    this.name = options.name || ''
  }

  initDomListeners() {
    this._changeEventListenersState('on')
  }

  disableDomListeners() {
    this._changeEventListenersState('off')
  }

  _changeEventListenersState = (state) => {
    this.listeners.forEach(listener => {
      const method = changeListenerName(listener)
      if (!this[method]) {
        throw new Error(`'${method}' is not exist in component '${this.name}'`)
      }
      if (state === 'on') {
        console.log(this[method])
        this[method] = this[method].bind(this)
      }
      this.$root[state](listener, this[method])
    })
  }
}

function changeListenerName(string) {
  return 'on' + capitalize(string)
}

