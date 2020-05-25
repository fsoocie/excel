import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.id
}

export function matrix($current, $target) {
  const current = $current.id(true)
  const target = $target.id(true)
  const rows = range(current.row, target.row)
  const cols = range(current.col, target.col)
  return rows.reduce((acc, row) => {
    cols.forEach(col => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'ArrowUp': {
      row > MIN_VALUE? row-- : MIN_VALUE
      break
    }
    case 'ArrowDown':
    case 'Enter': {
      row++
      break
    }
    case 'Tab':
    case 'ArrowRight': {
      col++
      break
    }
    case 'ArrowLeft': {
      col > MIN_VALUE? col-- : MIN_VALUE
      break
    }
  }
  return `${row}:${col}`
}
