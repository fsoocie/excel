
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, i) => i+start)
}

export function storage(key, value) {
  if (!value) {
    return JSON.parse(window.localStorage.getItem(key))
  } else {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(str) {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

export function toInlineStyles(styles) {
  return Object.keys(styles).map(key => {
    return `${camelToDashCase(key)}: ${styles[key]}`
  }).join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function preventDefault(e) {
  e.preventDefault()
}
