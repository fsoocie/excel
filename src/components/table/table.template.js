const CODES = {
  A: 65,
  Z: 90
}

const toCol = (content) => {
  return `<div class="column">${content}</div>`
}

const toCell = (content) => {
  return `<div class="cell" contenteditable>${content}</div>`
}

const createRow = (content, index = '') => {
  return `
      <div class="row">
        <div class="row-info">${index}</div>
        <div class="row-data">
          ${content}
        </div>
      </div>`
}

const toLetter = (_, index) => {
  return String.fromCharCode(CODES.A + index)
}

export const createTable = (rowsCount = 20) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toLetter)
      .map(toCol)
      .join('')
  rows.push(createRow(cols))
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    console.log(cells)
    rows.push(createRow(cells, i+1))
  }
  return rows.join('')
}
