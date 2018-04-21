import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { AuthConsumer } from '../context/Auth'

const Nav = styled.div`
  background-color: ${p => p.theme.colors.brown};
  color: white;
`
export default () => {
  return (
    <AuthConsumer>
      {({ isAuth, _login, _logout }) => (
        <Nav>
          <Link to="/">Home</Link>
          {isAuth && <Link to="/books">Books</Link>}
          {isAuth && <Link to="/settings">Settings</Link>}
          {isAuth && <Link to="/trades">Trades</Link>}
          {isAuth ? (
            <Link to="/" onClick={_logout}>
              Logout
            </Link>
          ) : (
            <Link to="/signin" onClick={_login}>
              Sign in
            </Link>
          )}
        </Nav>
      )}
    </AuthConsumer>
  )
}
