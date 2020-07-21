export class Page {
  constructor(params) {
    this.params = params
    this.destroy = this.destroy.bind(this)
  }
  afterInit() {}
  getRoot() {
    throw new Error('method getRoot should be implementer')
  }
  destroy() {}
}
