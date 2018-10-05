import reducer, { fetchRounds, fetchRoundsAction } from './index.js'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { login, loginAction } from '../auth'

const test = {}

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
    console.log(localStorage.getItem('AUTH_KEY'))
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
})
