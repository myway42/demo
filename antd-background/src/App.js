import React from 'react';
// import logo from './logo.svg';
import LayOut from './layout/LayOut';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <LayOut />
    </BrowserRouter>
  </Provider>
)

export default App;