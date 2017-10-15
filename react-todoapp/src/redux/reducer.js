import { INPUT_CHANGE, INPUT_SUBMIT, ITEM_CLICK, ITEM_DELETE } from './action'

const initialState = {
  list: [],
  newTodo: ''
}

export default function reducer(state = initialState, action){
  switch (action.type){
    case INPUT_CHANGE:
      return Object.assign(
        {},
        state,
        {newTodo: action.value}
      )
    case INPUT_SUBMIT:
      return Object.assign(
        {},
        state,
        {
          list: [...state.list, {item: state.newTodo, done: false}],
          newTodo: ''
        }
      )
    case ITEM_CLICK:
      return Object.assign(
        {},
        state,
        {list: [
          ...state.list.slice(0, action.index),
          Object.assign({}, state.list[action.index], {done: !state.list[action.index].done}),
          ...state.list.slice(action.index+1)
        ]}
      )
    case ITEM_DELETE:
      return Object.assign(
        {},
        state,
        {list: [
          ...state.list.slice(0, action.index),
          ...state.list.slice(action.index+1)
        ]}
      )
    default:
      return state
  }
}