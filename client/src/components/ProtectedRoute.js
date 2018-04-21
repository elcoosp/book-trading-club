import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../context/Auth'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/signin" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)
export default ProtectedRoute
