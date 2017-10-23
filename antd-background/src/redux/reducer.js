import { INPUT_SUBMIT, ITEM_DELETE } from './action'

let num = -1

// {
//   name: '王',
//   ads: '浙江杭州西湖',
//   phone: '1312312321',
//   email: 'djsk@11.com',
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
          phone: action.value.prefix+action.value.phone,
          email: action.value.email,
          key: num
          }]
        }
      )
    case ITEM_DELETE:
      return Object.assign(
        {},
        state,
        {userInfo: [
          ...state.userInfo.slice(0, action.index),
          ...state.userInfo.slice(action.index+1)
        ]}
      )
    default:
      return state
  }
}