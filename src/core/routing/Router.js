import $ from '../Dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    this.page = null
    this.routes = routes
    this.$placeholder = $(selector)
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }
  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()
    const Page = ActiveRoute.hash.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterInit()
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
