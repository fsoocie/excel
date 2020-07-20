import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const getWidth = (state = {}, index) => {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
const getHeight = (state = {}, rowIndex) => {
  return (state[rowIndex] || DEFAULT_HEIGHT) + 'px'
}

const toCol = (col, index, width) => {
  return `<div style="width: ${width}"
               class="column"
               data-type='resizable'
               data-col=${index}
          >
            ${col}
            <div class='col-resize' data-resize='col'></div>
          </div>`
}

const toCell = (row, state = {}) => {
  return (_, col) => {
    const id = `${row}:${col}`
    const data = state.dataState[id] || ''
    const width = getWidth(state.colState, col)
    const currentStyles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]})
    return `<div class="cell"
        style="${currentStyles} ;width: ${width}"
        contenteditable
        data-col=${col}
        data-id='${id}'
        data-value="${data}"
        >${parse(data)}</div>`
  }
}

const createRow = (content, index = '', state) => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
      <div class="row" data-row="${index}"
       style="height: ${height}"
       data-type="resizable">
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

export const createTable = (rowsCount = 20, state) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toLetter)
      .map((col, index) => {
        return toCol(col, index, getWidth(state.colState, index))
      })
      .join('')
  rows.push(createRow(cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')
    rows.push(createRow(cells, row+1, state.rowState))
  }
  return rows.join('')
}
