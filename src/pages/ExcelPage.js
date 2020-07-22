import {Page} from '@core/page/Page';
import {CreateStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {toInitialState} from '@core/initialState';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {updateDate} from '@/redux/actions';
import {LocalStorageClient} from '@/shared/LocalStorageClient';
import {StateProcessor} from '@core/page/StateProcessor';

export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }
  async getRoot() {
    const state = await this.processor.get()
    this.store = new CreateStore(rootReducer, toInitialState(state))
    this.storeSub = this.store.subscribe(this.processor.listen)
    this.excel = new Excel('#app', {
      components: [Header, Toolbar, Formula, Table],
      store: this.store
    })
    this.store.dispatch(updateDate())
    return this.excel.getRoot()
  }
  afterInit() {
    this.excel.initial()
  }
  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe.apply(this.store)
  }
}
