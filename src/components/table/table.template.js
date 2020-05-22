const CODES = {
  A: 65,
  Z: 90
}

const toCol = (col, index) => {
  return `<div class="column" data-type='resizable' data-col=${index+1}>
            ${col}
            <div class='col-resize' data-resize='col'></div>
          </div>`
}

const toCell = (cell, index) => {
  return `<div class="cell" data-col=${index+1} contenteditable>${cell}</div>`
}

const createRow = (content, index = '') => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
      <div class="row" data-type="resizable">
        <div class="row-info">
          ${index}
          ${resize}
          </div>
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
    rows.push(createRow(cells, i + 1))
  }
  return rows.join('')
}
