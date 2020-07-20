export class CreateStore {
  constructor(rootReducer, state) {
    this.rootReducer = rootReducer
    this.subscribers = []
    this.state = state || {}
  }
  subscribe(fn) {
    this.subscribers.push(fn)
    return {
      unsubscribe() {
        this.subscribers = this.subscribers.filter(l => l !== fn)
      }
    }
  }
  dispatch(action) {
    this.state = this.rootReducer(action, this.state)
    this.subscribers.forEach(fn => fn(this.state))
  }
  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}
