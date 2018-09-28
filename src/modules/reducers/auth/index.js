import { createActionThunk } from 'redux-thunk-actions'
import request from 'superagent'

export const loginAction = async body => {
  return request
    .post('https://papi-stage.contentmedia.eu/2.0/auth/authenticate')
    .set('Accept', 'application/json, text/plain, */*')
    .set('Content-Type', 'application/json; charset=UTF-8')
    .send(body)
}

export const login = createActionThunk('LOGIN', body => loginAction(body))

export const initialState = {
  isAuthenticated: false,
  isLoading: false,
  key: '',
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_STARTED': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'LOGIN_SUCCEEDED': {
      const {
        body: { partnersession },
      } = action.payload
      localStorage.setItem('AUTH_KEY', partnersession)
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        key: partnersession,
      }
    }
    case 'LOGIN_FAILED': {
      const { error } = action
      return {
        ...state,
        isLoading: false,
        error,
      }
    }
    default: {
      return state
    }
  }
}
