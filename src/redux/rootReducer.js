import {
  APPLY_CHANGES,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  TABLE_RESIZE
} from '@/redux/types';

export function rootReducer(action, state = {}) {
  let field
  let val
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col'? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, action)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {...state,
        currentText: action.data.value,
        [field]: value(state, field, action)}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_CHANGES:
      val = state.stylesState || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.style}
      })
      return {...state,
        stylesState: {...state.stylesState, ...val},
        currentStyles: {...state.currentStyles, ...action.data.style}
      }
    case CHANGE_TITLE:
      return {...state, tableTitle: action.data}
    default:
      return state
  }
}

const value = (state, field, action) => {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
