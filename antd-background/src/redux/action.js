export const INPUT_SUBMIT = 'INPUT_SUBMIT'

export function inputSubmit(value) {
  return {
    type: INPUT_SUBMIT,
    value
  }
}

export const ITEM_DELETE = 'ITEM_DELETE'

export function itemDelete(index) {
  return {
    type: ITEM_DELETE,
    index
  }
}