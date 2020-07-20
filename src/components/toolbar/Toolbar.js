import {createToolbar} from '@/components/toolbar/createToolbar';
import $ from '@core/Dom';
import {StateExcelComponents} from '@core/StateExcelComponents';
import {defaultStyles} from '@/constants';

export class Toolbar extends StateExcelComponents {
  static className = 'excel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribers: ['currentStyles'],
      ...options
    });
  }
  prepare() {
    this.initState(defaultStyles)
  }
  storeChanged({currentStyles}) {
    this.setState(currentStyles)
  }
  get template() {
    return createToolbar(this.state)
  }
  toHTML() {
    return this.template
  }
  onClick(event) {
    const $target = $(event.target)
    const data = $target.data
    if (data.type === 'button') {
      const value = JSON.parse(data.value)
      /* const key = Object.keys(value)[0]
      this.setState({[key]: value[key]}) */
      this.$emit('toolbar:applyStyles', value)
    }
  }
}
