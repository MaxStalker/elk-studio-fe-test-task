import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../../modules/reducers/auth/index'
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Input,
  withStyles,
  withTheme,
  InputAdornment,
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
  MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons/'
import { styles } from './styles'
import logo from '../../assets/elk-logo.svg'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }
  handleSubmit = async e => {
    console.log(this.props)
    e.preventDefault()
    const { email, password } = this.state
    this.props.login({
      email,
      password,
    })
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  render() {
    const { email, password, showPassword } = this.state
    const {
      auth: { isLoading, isAuthenticated },
    } = this.props
    const { classes, theme } = this.props
    console.log(this.state)

    return (
      <Fragment>
        {console.log('Redirect from Login') ||
          (isAuthenticated && <Redirect to="/" />)}
        <main className={classes.root}>
          <CssBaseline />
          <Grid container alignItems={'center'} justify="center">
            <Grid item xs={5}>
              <Card>
                <div
                  className={classNames(classes.backdrop)}
                  title={'Elk Studios'}
                >
                  <img src={logo} />
                </div>
                <CardContent className={classNames(classes.formContainer)}>
                  <FormControl
                    fullWidth
                    className={classNames(classes.bottomMargin)}
                    aria-describedby="email-input-text"
                  >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      id="email"
                      type={'text'}
                      value={email}
                      onChange={this.handleChange('email')}
                      inputProps={{
                        'aria-label': 'Email',
                      }}
                    />
                  </FormControl>

                  <FormControl
                    fullWidth
                    className={classNames(classes.bottomMargin2)}
                    aria-describedby="password-input-text"
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={this.handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibiity"
                            onClick={this.handleClickShowPassword}
                          />
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </InputAdornment>
                      }
                      inputProps={{
                        'aria-label': 'Password',
                      }}
                    />
                  </FormControl>
                  <Button
                    size="large"
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classNames(styles.submit, styles.bottomMargin2)}
                    onClick={this.handleSubmit}
                  >
                    Sign In
                  </Button>
                  {isLoading && <p>Loading, please wait...</p>}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login))
