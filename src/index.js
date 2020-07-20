import '@/scss/index.scss';

import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {CreateStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {initialState} from '@core/initialState';

const store = new CreateStore(rootReducer, initialState)

const storeListener = debounce(state => {
  console.log('CHANGES WERE')
  storage('app-state', state)
}, 300)

store.subscribe(storeListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
