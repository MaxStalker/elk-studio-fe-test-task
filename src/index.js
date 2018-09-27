import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import { createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

/* const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
}) */

ReactDOM.render(<App />, document.getElementById('root'))
