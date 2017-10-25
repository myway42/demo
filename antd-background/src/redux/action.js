/**
 * 具体的action,用来操作组件时dispatch给reducer
 * 表单提交: 新增数据,传入表单所有数据
 * 项目删除: 删除数据,传入要删除项的key值
 */

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