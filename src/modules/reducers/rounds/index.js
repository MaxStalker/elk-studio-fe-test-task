// @flow
import { createActionThunk } from 'redux-thunk-actions'
import request from 'superagent'
import { ROUND_LIST_URL } from './../../../helpers/api'

type GetState = () => State
type PromiseAction = Promise<Action>
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>,
) => any
type RoundsData = {
  byId: {},
  list: Array<number>,
}

type State = {
  +isLoading: boolean,
  +byId: {},
  +list: Array<Round>,
}

type FetchRoundsStarted = { type: 'FETCH_ROUNDS_STARTED', payload: {} }
type FetchRoundsSucceded = {
  type: 'FETCH_ROUNDS_SUCCEEDED',
  payload: { body: { rounds: Array<Round> } },
}
type FetchRoundsFailed = {
  type: 'FETCH_ROUNDS_FAILED',
  payload: {},
}
type Action = FetchRoundsStarted | FetchRoundsSucceded | FetchRoundsFailed
type ThunkActionCreator = () => any

export const buildQuery = (args: { [key: string]: any }) => {
  let query = '?'
  for (const key in args) {
    if (args.hasOwnProperty(key)) {
      query += `${key}=${args[key]}&`
    }
  }
  return query.length === 1 ? '' : query.slice(0, -1)
}

export const fetchRoundsAction = async (
  params: FetchRoundsParams,
): Promise<any> => {
  const key = localStorage.getItem('AUTH_KEY')
  if (!key) {
    throw 'Key is not set or expired'
  }
  return request
    .get(ROUND_LIST_URL)
    .query(params)
    .set('Accept', 'application/json, text/plain, */*')
    .set('Authorization', key)
}

export const fetchRounds = createActionThunk(
  'FETCH_ROUNDS',
  (params: FetchRoundsParams): Promise<any> => fetchRoundsAction(params),
)

export const massageRoundsData = (data: Array<Round>): RoundsData => {
  return data.reduce(
    (acc: RoundsData, round: Round): RoundsData => {
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
    { byId: {}, list: [] },
  )
}

export const initialState = {
  isLoading: false,
  byId: {},
  list: [],
}

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'FETCH_ROUNDS_STARTED': {
      return {
        ...state,
        isLoading: true,
        error: null,
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
      const { payload } = action
      return {
        ...state,
        isLoading: false,
        error: JSON.parse(payload.response.text),
      }
    }
    default: {
      return state
    }
  }
}
