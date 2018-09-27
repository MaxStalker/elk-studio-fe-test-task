import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...prps} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
)
