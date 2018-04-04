import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import { log } from 'util'

const Navigation = ({ isAuthenticated, _logout }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated && (
        <Fragment>
          <Link to="/settings">Settings</Link>
          <Link to="/mybooks">My Books</Link>
          <Link to="/requests">Requests</Link>
        </Fragment>
      )}
      {isAuthenticated ? (
        <a onClick={() => _logout()}>Logout</a>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
    </nav>
  )
}

export default connect(
  {
    isAuthenticated: state`auth.isAuthenticated`,
    _logout: signal`logout`
  },
  Navigation
)
