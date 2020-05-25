import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }
  toHTML() {
    return `
     <div class="fx">fx</div>
     <div id="formula" class="input" contenteditable spellcheck="false" ></div>`
  }
  init() {
    super.init();
    const formula = this.$root.find('#formula')
    this.$on('table:select', ($cell) => {
      formula.text($cell.text())
    })
    this.$on('table:input', ($cell) => {
      formula.text($cell.text())
    })
  }
  onInput(event) {
    this.$emit('formula:input', event.target.textContent)
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done', event.key)
    }
  }
}
