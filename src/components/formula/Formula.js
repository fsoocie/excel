import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }
  toHTML() {
    return `
       <div class="fx">fx</div>
       <div class="input" contenteditable spellcheck="false" ></div>`
  }
  onInput(event) {
  }
  onClick(event) {
  }
}
