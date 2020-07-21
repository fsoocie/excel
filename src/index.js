import '@/scss/index.scss';
import {Router} from '@core/routing/Router';
import {DashBoardPage} from '@/pages/DashBoardPage';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
  dashboard: DashBoardPage,
  excel: ExcelPage
})
