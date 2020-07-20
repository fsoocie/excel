import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribers: ['currentText'],
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
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.attr('data-value'))
    })
  }
  storeChanged({currentText}) {
    this.$formula.text(currentText)
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
