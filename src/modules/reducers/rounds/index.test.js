import reducer, {
  fetchRounds,
  fetchRoundsAction,
  massageRoundsData,
} from './index.js'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { login, loginAction } from '../auth'

const test = {}

describe('Test utility functions', () => {
  it('shall throw error on empty key', done => {
    let promise = fetchRoundsAction({
      accountId: 60137,
      dateFrom: '2018-08-16T00:30:10Z',
      operatorId: 7,
    }).catch(err => {
      expect(err).toEqual('Key is not set or expired')
      done()
    })
  })
})

describe('Test Reducer', () => {
  beforeEach(async () => {
    test.store = createStore(reducer, applyMiddleware(...[thunkMiddleware]))
    localStorage.clear()
    let promise = await loginAction({
      email: 'careers@elk-studios.com',
      password: 'password',
    })
    localStorage.setItem('AUTH_KEY', promise.body.partnersession)
  })

  it('shall test fetchRoundsAction', done => {
    let promise = fetchRoundsAction({
      accountId: 60137,
      dateFrom: '2018-08-16T00:30:10Z',
      operatorId: 7,
    }).then(data => {
      const { status } = data
      expect(status).toEqual(200)
      done()
    }, done)
  })

  it('shall succesfully fetch', done => {
    let promise = test.store.dispatch(
      fetchRounds({
        accountId: 60137,
        dateFrom: '2018-08-16T00:30:10Z',
        operatorId: 7,
      }),
    )
    expect(test.store.getState().isLoading).toEqual(true)
    promise.then(
      res => {
        const {
          status,
          body: { rounds },
        } = res
        const { id } = rounds[0]
        const afterState = test.store.getState()
        expect(status).toEqual(200)
        expect(afterState.isLoading).toEqual(false)
        expect(afterState.list.length).toEqual(rounds.length)
        expect(afterState.byId[id].status).toEqual(rounds[0].status)
        expect(afterState.list).toContain(id)
        done()
      },
      error => {
        done
      },
    )
  })
  it('shall fail fetch', done => {
    let promise = test.store.dispatch(
      fetchRounds({
        accountId: 60137,
        dateFrom: '2018-08-16T00:30:10Z',
        operatorId: 1,
      }),
    )
    expect(test.store.getState().isLoading).toEqual(true)
    promise.then(done, error => {
      const { status } = error
      expect(status).toEqual(403)
      expect(test.store.getState().isLoading).toEqual(false)
      expect(test.store.getState().error.code).toEqual(403)
      done()
    })
  })
  it('shall update state on FETCH_ROUNDS_SUCCEEDED', () => {
    const newState = reducer(
      { isLoading: true, byId: {}, list: [] },
      {
        type: 'FETCH_ROUNDS_SUCCEEDED',
        payload: {
          body: {
            rounds: [
              {
                id: 'id-1',
                data: 'test',
              },
            ],
          },
        },
      },
    )
    expect(newState.isLoading).toEqual(false)
    expect(newState.list.length).toEqual(1)
    expect(newState.byId['id-1'].data).toEqual('test')
  })
})
