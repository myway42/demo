export const INPUT_CHANGE = 'INPUT_CHANGE'

export function inputChange(value) {
  return {
    type: INPUT_CHANGE,
    value
  }
}

export const INPUT_SUBMIT = 'INPUT_SUBMIT'

export function inputSubmit() {
  return {
    type: INPUT_SUBMIT
  }
}

export const ITEM_CLICK = 'ITEM_CLICK'

export function itemClick(index) {
  return {
    type: ITEM_CLICK,
    index
  }
}

export const ITEM_DELETE = 'ITEM_DELETE'

export function itemDelete(index) {
  return {
    type: ITEM_DELETE,
    index
  }
}