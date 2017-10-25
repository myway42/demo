import { INPUT_SUBMIT, ITEM_DELETE } from './action'

/**
 * 初始化state
 * 根据传入的actionType操作state
 * Object.assign合并多个对象组成新对象,防止对象内容改变而引用不变导致不能正确渲染
 * 给每个新增的数据添加唯一的key值,方便后续操作
 * 当表单数据输入不完整时,默认返回原state
 */

let num = -1

// {
//   name: '王',
//   ads: '浙江杭州西湖',
//   phone: '861312312321',
//   email: 'djsk@163.com',
//   key: 0
// }

const initialState = {
  userInfo: []
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case INPUT_SUBMIT:
      if (!action.value.name || !action.value.ads || !action.value.phone || !action.value.email) {
        return state
      }
      num++;
      return Object.assign(
        {},
        state,
        {userInfo: [...state.userInfo, {
          name: action.value.name,
          ads: action.value.ads.reduce((pre, next) => (pre+next)),
          phone: action.value.prefix + action.value.phone,
          email: action.value.email,
          key: num
          }]
        }
      )
    case ITEM_DELETE:
      let i = state.userInfo.indexOf(value => value.key = action.index)
      return Object.assign(
        {},
        state,
        {userInfo: [
          ...state.userInfo.slice(0, i),
          ...state.userInfo.slice(i+1)
        ]}
      )
    default:
      return state
  }
  
}