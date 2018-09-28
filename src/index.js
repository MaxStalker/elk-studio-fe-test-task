import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App/index'
import { Provider } from 'react-redux'
import store from './modules/store'

const appRoot = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  appRoot
)
