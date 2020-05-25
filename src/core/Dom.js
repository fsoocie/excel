class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
    return this
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
    return this
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  get data() {
    return this.$el.dataset
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
  id(parse) {
    if (parse) {
      return {
        row: +this.$el.dataset.id.split(':')[0],
        col: +this.$el.dataset.id.split(':')[1]
      }
    }
    return this.$el.dataset.id
  }
  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    } else if (this.$el.tagName === 'INPUT') {
      this.$el.value = text
      return this
    }
    return this.$el.textContent
  }
  focus() {
    this.$el.focus()
    return this
  }
  clear() {
    this.html('')
    return this
  }
}

export default function $(selector) {
  return new Dom(selector)
}

$.create = (tag, className = '') => {
  const $newEl = document.createElement(tag)
  if (className) {
    $newEl.classList.add(className)
  }
  return new Dom($newEl)
}
