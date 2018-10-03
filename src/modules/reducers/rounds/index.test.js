import reducer, { fetchRounds, fetchRoundsAction } from './index.js'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const test = {}

describe('Test Reducer', () => {
  beforeEach(() => {
    // TODO: populate items here with action creators
    test.store = createStore(reducer, applyMiddleware(...[thunkMiddleware]))
    localStorage.clear()
    localStorage.setItem(
      'AUTH_KEY',
      'asYtaMY21535YTfyr5VlNB5F43dTTnVCCAl6uIs9hsa5IZbOrd',
    )
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
      // TODO: Fix response handling
      expect(status).toEqual(401)
      expect(test.store.getState().isLoading).toEqual(false)
      expect(test.store.getState().error.status).toEqual(401)
      done()
    })
  })
})
