import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Router from './router'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router />
        </Provider>
      </div>
    )
  }
}

export default App