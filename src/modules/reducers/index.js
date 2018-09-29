import { combineReducers } from 'redux'
import auth from './auth'
import rounds from './rounds'

export default combineReducers({
  auth,
  rounds
})
