import {storage} from '@core/utils';

function toHTML(key) {
  const model = storage(key)
  return `
      <li class="db__record">
        <a href="#excel/${key.split(':')[1]}">${model.tableTitle}</a>
        <strong>
            ${new Date(model.updateDate).toLocaleDateString()}
            ${new Date(model.updateDate).toLocaleTimeString()}
        </strong>
      </li>
`
}


export function createTablesList() {
  const keys = []
  for (let i = 0; i < window.localStorage.length; i++) {
    if (window.localStorage.key(i).includes('excel')) {
      keys.push(window.localStorage.key(i))
    }
  }
  if (!keys.length) {
    return `
    <div class="db__table db__view">
        <h2>У вас нет ни одной таблицы. Создайте новую.</h2>
    </div>`
  }
  return `
    <div class="db__table db__view">
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>
      <ul class="db__list">
        ${keys.map(toHTML).join('')}
      </ul>
  `
}
