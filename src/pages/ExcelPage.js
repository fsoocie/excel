import {Page} from '@core/Page';
import {CreateStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {toInitialState} from '@core/initialState';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {updateDate} from '@/redux/actions';

function toStorageName(hash) {
  return 'excel:'+hash
}

export class ExcelPage extends Page {
  getRoot() {
    const state = storage(toStorageName(this.params))
    const store = new CreateStore(rootReducer, toInitialState(state))
    const storeListener = debounce(state => {
      storage(toStorageName(this.params), state)
    }, 300)
    store.subscribe(storeListener)
    this.excel = new Excel('#app', {
      components: [Header, Toolbar, Formula, Table],
      store
    })
    store.dispatch(updateDate())
    return this.excel.getRoot()
  }
  afterInit() {
    this.excel.initial()
  }
  destroy() {
    this.excel.destroy()
  }
}
