import {
  APPLY_CHANGES,
  CHANGE_STYLES,
  CHANGE_TEXT, CHANGE_TITLE,
  TABLE_RESIZE
} from '@/redux/types';

export function tableResize(data) {
  return {type: TABLE_RESIZE, data}
}

export function changeText(data) {
  return {type: CHANGE_TEXT, data}
}

export function changeStyles(data) {
  return {type: CHANGE_STYLES, data}
}

export function applyChanges(data) {
  return {type: APPLY_CHANGES, data}
}

export function changeTitle(data) {
  return {type: CHANGE_TITLE, data}
}
