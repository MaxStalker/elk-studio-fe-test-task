import { createActionThunk } from 'redux-thunk-actions'
import request from 'superagent'
import { ROUND_LIST_URL } from './../../../helpers/api'

export const buildQuery = args => {
  let query = '?'
  for (const key in args) {
    if (args.hasOwnProperty(key)) {
      query += `${key}=${args[key]}&`
    }
  }
  return query.length === 1 ? '' : query.slice(0, -1)
}

export const fetchRoundsAction = async params => {
  const { accountId, dateFrom, operatorId } = params
  const key = localStorage.getItem('AUTH_KEY')
  if (!key) {
    throw 'Key is not set or expired'
  }
  return request
    .get(ROUND_LIST_URL)
    .query({ accountId, dateFrom, operatorId })
    .set('Accept', 'application/json, text/plain, */*')
    .set('Authorization', key)
}

export const fetchRounds = createActionThunk('FETCH_ROUNDS', body =>
  fetchRoundsAction(body)
)

export const massageRoundsData = data => {
  return data.reduce(
    (acc, round) => {
      const { id } = round
      acc.list.push(id)
      acc.byId[id] = {
        ...round,
        formated: {
          created: new Date(round.created).toUTCString(),
        },
      }
      return acc
    },
    { byId: {}, list: [] }
  )
}

export const initialState = {
  isLoading: false,
  byId: {},
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROUNDS_STARTED': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'FETCH_ROUNDS_SUCCEEDED': {
      const {
        body: { rounds },
      } = action.payload
      const { byId, list } = massageRoundsData(rounds)
      return {
        ...state,
        isLoading: false,
        byId,
        list,
      }
    }
    case 'FETCH_ROUNDS_FAILED': {
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
