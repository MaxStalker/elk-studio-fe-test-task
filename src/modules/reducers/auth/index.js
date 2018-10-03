// @flow
import { createActionThunk } from 'redux-thunk-actions'
import request from 'superagent'
import { AUTHENTICATE_URL } from '../../../helpers/api'

type LoginBody = {
  email: string,
  password: string,
}

type GetState = () => State
type PromiseAction = Promise<Action>
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>,
) => any
type State = {
  +isAuthenticated: boolean,
  +isLoading: boolean,
  +key: string,
}
type LogoutAction = { type: 'LOGOUT' }
type LoginActionStarted = { type: 'LOGIN_STARTED', payload: {} }
type LoginActionSucceded = {
  type: 'LOGIN_SUCCEEDED',
  payload: { body: { partnersession: string } },
}
type LoginActionFailed = { type: 'LOGIN_FAILED', payload: {}, error: {} }
type Action =
  | LogoutAction
  | LoginActionStarted
  | LoginActionSucceded
  | LoginActionFailed

export const loginAction = async (body: LoginBody): Promise<any> => {
  return request
    .post(AUTHENTICATE_URL)
    .set('Accept', 'application/json, text/plain, */*')
    .set('Content-Type', 'application/json; charset=UTF-8')
    .send(body)
}

export const login = createActionThunk(
  'LOGIN',
  (body: LoginBody): Promise<any> => loginAction(body),
)
export const logout = () => (dispatch: Dispatch) => {
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

export default (state: State = initialState, action: Action) => {
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
      const { body } = action.payload
      const { partnersession } = body
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
