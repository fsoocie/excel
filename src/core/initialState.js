import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  tableTitle: defaultTitle,
  currentText: ''
}

export const initialState = storage('app-state') || defaultState
