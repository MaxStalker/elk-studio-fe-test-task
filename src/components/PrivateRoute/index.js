// @flow
import React, { type Node, type Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

type Props = {
  component: Component,
  isAuthenticated: boolean,
  location?: string,
}

export default (props: Props): Node => {
  const { component: Home, isAuthenticated, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props: Props): Node =>
        isAuthenticated ? (
          <Home {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
