import { createActionThunk } from 'redux-thunk-actions'
import request from 'superagent'
import { AUTHENTICATE_URL } from '../../../helpers/api'

export const loginAction = async body => {
  return request
    .post(AUTHENTICATE_URL)
    .set('Accept', 'application/json, text/plain, */*')
    .set('Content-Type', 'application/json; charset=UTF-8')
    .send(body)
}

export const login = createActionThunk('LOGIN', body => loginAction(body))
export const logout = () => dispatch => {
  localStorage.removeItem('AUTH_KEY')
  dispatch({
    type: 'LOGOUT',
  })
}

const key = localStorage.getItem('AUTH_KEY')
export const initialState = {
  isAuthenticated: Boolean(key),
  isLoading: false,
  key: key || '',
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        key: '',
      }
    }
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
