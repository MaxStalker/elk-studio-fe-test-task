import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Grid, Paper } from '@material-ui/core'

class App extends Component {
  state = {
    email: '',
    password: '',
  }
  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    const body = JSON.stringify({
      email,
      password,
    })
    fetch('https://papi-stage.contentmedia.eu/2.0/auth/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    }).then(response => {
      console.log(response)
    })
  }
  handleInput = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }
  render() {
    const { email, password } = this.state
    return (
      <Grid spacing={16} align="center" justify="center">
        <Grid item xs={6}>
          <Paper>
            <Grid container>
              <Grid item direction="column">
                <form onSubmit={e => this.handleSubmit(e)}>
                  <label>
                    Email:
                    <input
                      data-test="email"
                      type="text"
                      name="email"
                      onChange={this.handleInput}
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      data-test="password"
                      type="password"
                      name="password"
                      onChange={this.handleInput}
                    />
                  </label>
                  <button id="login">Login</button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default App
