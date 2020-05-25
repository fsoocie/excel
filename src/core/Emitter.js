export class Emitter {
  constructor() {
    this.listeners = {}
  }
  emit(event, ...args) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((listener) => listener(...args))
      return true
    }
    return false
  }
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter((listener) => {
          return listener !== fn
        })
    }
  }
}

