import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from './reducer'

const logger = createLogger()
const reducers = combineReducers({
  reducer
})

const store = createStore(
  reducers,
  applyMiddleware(logger)
)

export default store