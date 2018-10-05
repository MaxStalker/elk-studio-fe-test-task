import reducer, { login } from './index.js'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const test = {}

describe('Auth', () => {
  beforeEach(() => {
    test.store = createStore(reducer, applyMiddleware(...[thunkMiddleware]))
  })
  it('shall fail login', done => {
    let promise = test.store.dispatch(
      login({ email: 'wrong@email.com', password: 'wrong-pass' }),
    )
    expect(test.store.getState().isLoading).toEqual(true)
    expect(test.store.getState().key).toEqual('')
    promise.then(done, error => {
      const { status } = error
      expect(status).toEqual(403)
      expect(test.store.getState().isLoading).toEqual(false)
      expect(test.store.getState().error.code).toEqual(403)
      expect(test.store.getState().error.msg).toEqual(
        'Access forbidden: invalid username or password',
      )
      done()
    })
  })
  it('shall succesfully login', done => {
    let promise = test.store.dispatch(
      login({ email: 'careers@elk-studios.com', password: 'password' }),
    )
    expect(test.store.getState().isLoading).toEqual(true)
    expect(test.store.getState().key).toEqual('')
    promise.then(
      res => {
        const {
          status,
          body: { partnersession },
        } = res
        expect(status).toEqual(200)
        expect(test.store.getState().isLoading).toEqual(false)
        expect(test.store.getState().isAuthenticated).toEqual(true)
        expect(test.store.getState().key).toEqual(partnersession)
        done()
      },
      error => {
        // Handle errors here
        done()
      },
    )
  })
})
