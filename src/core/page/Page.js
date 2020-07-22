export class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
    this.destroy = this.destroy.bind(this)
  }
  afterInit() {}
  getRoot() {
    throw new Error('method getRoot should be implementer')
  }
  destroy() {}
}
