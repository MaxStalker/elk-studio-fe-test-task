// @flow
import React, { type Node } from 'react'
import { Route, Redirect } from 'react-router-dom'

type Props = {
  component: any,
  isAuthenticated: boolean,
  location?: string,
}

export default (props: Props): Node => {
  const { component: Component, isAuthenticated, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props: Props): Node =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
