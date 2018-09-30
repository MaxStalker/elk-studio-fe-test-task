import React, { Component } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../Login'
import RoundList from '../RoundList'
import PrivateRoute from '../../components/PrivateRoute'
import createBrowserHistory from 'history/createBrowserHistory'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors'

const history = createBrowserHistory()
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey,
  },
})

class App extends Component {
  render() {
    const {
      auth: { isAuthenticated },
    } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute
              path="/"
              isAuthenticated={isAuthenticated}
              component={RoundList}
            />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
})
export default connect(
  mapStateToProps,
  null
)(App)
