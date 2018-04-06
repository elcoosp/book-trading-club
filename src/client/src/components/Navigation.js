import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from '../context/Auth'

import { log } from 'util'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid black;
`

const Navigation = ({ auth }) => {
  return (
    <Nav>
      <Link to="/">Home</Link>
      {auth.S.isLoggedIn && (
        <Fragment>
          <Link to="/settings">Settings</Link>
          <Link to="/mybooks">My Books</Link>
          <Link to="/requests">Requests</Link>
        </Fragment>
      )}
      {auth.S.isLoggedIn ? (
        <a onClick={auth.A.logout}>Logout</a>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
    </Nav>
  )
}

export default withAuth(Navigation)
