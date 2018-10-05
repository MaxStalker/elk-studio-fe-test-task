// @flow
import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, clearError } from '../../modules/reducers/auth'
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
  CssBaseline,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons/'
import { styles } from './styles'
import logo from '../../assets/elk-logo.svg'
import { Redirect } from 'react-router-dom'

type Props = {
  classes: any,
  theme: any,
  login: ({}) => void,
  auth: {
    isLoading: boolean,
    isAuthenticated: boolean,
    error?: {},
  },
}

type State = {
  email: string,
  password: string,
  showPassword: boolean,
}

type ChangeMethod = (SyntheticEvent<HTMLInputElement>) => void

class Login extends Component<Props, State> {
  state = {
    email: '',
    password: '',
    showPassword: false,
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
  }
  handleSubmit = async (e: SyntheticEvent<HTMLButtonElement>): Promise<any> => {
    e.preventDefault()
    const { email, password } = this.state
    return this.props
      .login({
        email,
        password,
      })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = (prop): ChangeMethod => (
    event: SyntheticEvent<HTMLInputElement>,
  ): void => {
    //(event.currentTarget: HTMLInputElement)
    this.setState({ [prop]: event.currentTarget.value })
    this.props.clearError()
  }

  render() {
    const { email, password, showPassword } = this.state
    const {
      auth: { isLoading, isAuthenticated, error },
    } = this.props
    const {
      classes,
      theme,
    }: {
      classes: {
        root: {},
        backdrop: {},
        backgroundOverlay: {},
        bottomMargin: {},
        bottomMargin2: {},
        formContainer: {},
        submit: {},
      },
      theme: {},
    } = this.props

    // TODO: Validate form on input and disabled button if not all fields are filled
    return (
      <Fragment>
        <main className={classes.root}>
          <div className={classes.backgroundOverlay} />
          <CssBaseline />
          <Grid container alignItems={'center'} justify="center">
            <Grid item xl={3} lg={4} md={5} xs={10}>
              <Card elevation={3} className={error ? 'shake' : ''}>
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
                        'data-test': 'email',
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
                          >
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{
                        'aria-label': 'Password',
                        'data-test': 'password',
                      }}
                    />
                  </FormControl>
                  <Button
                    disabled={error}
                    data-test="btn-login"
                    size="large"
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classNames(
                      classes.submit,
                      classes.bottomMargin2,
                    )}
                    onClick={this.handleSubmit}
                  >
                    {error ? 'Change details and try again' : 'Sign In'}
                  </Button>
                  {isLoading && <p>Loading, please wait...</p>}
                  {error && <p data-test={'form-error'}>{error.msg}</p>}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = (state: { auth: {} }) => ({
  auth: state.auth,
})

const mapDispatchToProps = (dispatch: () => any) =>
  bindActionCreators(
    {
      login,
      clearError,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Login))
