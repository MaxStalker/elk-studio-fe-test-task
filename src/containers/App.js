import React, { Component } from 'react'
import { Switch, Route } from '@material-ui/core'
import PrivateRoute from '../components/PrivateRoute'
import Home from './Home'
import RoundList from './RoundList/index'

class App extends Component {
  state = {
    isAuthenticated: '',
  }

  componentDidMount() {
    const authData = localStorage.getItem('AUTH')
    if (authData) {
      this.setState({
        isAuthenticated: true,
      })
    }
  }

  render() {
    const { isAuthenticated } = this.state
    return (
      <Switch>
        <Route exact path="/login" component={Home} />
        <PrivateRoute
          path="/"
          isAuthenticated={isAuthenticated}
          component={RoundList}
        />
      </Switch>
    )
  }
}

export default App
