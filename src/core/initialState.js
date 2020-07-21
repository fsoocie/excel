import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  tableTitle: defaultTitle,
  currentText: '',
  updateDate: new Date().toJSON()
}

export function toInitialState(state) {
  return state ? state : JSON.parse(JSON.stringify(defaultState))
}
