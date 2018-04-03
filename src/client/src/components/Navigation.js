import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

const Navigation = ({ isAuthenticated }) => (
  <nav>
    <Link to="/">Home</Link>
    {isAuthenticated && (
      <Fragment>
        <Link to="/settings">Settings</Link>
        <Link to="/mybooks">My Books</Link>
        <Link to="/requests">Requests</Link>
      </Fragment>
    )}
    <Link to="/signin">Sign in</Link>
  </nav>
)

export default connect(
  {
    isAuthenticated: state`auth.isAuthenticated`
  },
  Navigation
)
