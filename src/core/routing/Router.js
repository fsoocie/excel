import $ from '../Dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '../../components/Loader';

export class Router {
  constructor(selector, routes) {
    this.loader = new Loader()
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
  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)
    const Page = ActiveRoute.hash.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    this.page = new Page(ActiveRoute.param)
    const root = await this.page.getRoot()
    this.$placeholder.clear().append(root)
    this.page.afterInit()
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
