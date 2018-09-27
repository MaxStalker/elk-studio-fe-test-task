import React, { Component } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import Login from '../Login'
import Home from '../Home'
import RoundList from '../RoundList'
import PrivateRoute from '../../components/PrivateRoute'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

class App extends Component {
  constructor(props) {
    super(props)
    const key = localStorage.getItem('AUTH_KEY')
    this.state = {}
    if (key) {
      this.state = {
        isAuthenticated: true,
        key,
      }
    }
  }
  componentDidMount() {}
  render() {
    const { isAuthenticated } = this.state
    console.log(this.state)
    return (
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
    )
  }
}

export default App
