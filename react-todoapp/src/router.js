import React from 'react'
import { Route } from 'react-router-dom'
import history from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import TodoApp from './components/TodoApp'
import InputContainer from './containers/InputContainer'
import ListContainer from './containers/ListContainer'

const Router = () => {
  return (
    <ConnectedRouter history={history()}>
      <div>
        <TodoApp />
        <Route exact path='/' component={InputContainer} />
        <Route exact path='/list' component={ListContainer} />
      </div>
    </ConnectedRouter>
  )
}

export default Router