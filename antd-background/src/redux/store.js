import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from './reducer'

/**
 * 载入中间件logger: 在控制台打印日志
 * 合并reducers: 此项目中暂时只有一个reducer
 * 创建store树
 */

const logger = createLogger()
const reducers = combineReducers({
  reducer
})

const store = createStore(
  reducers,
  applyMiddleware(logger)
)

export default store