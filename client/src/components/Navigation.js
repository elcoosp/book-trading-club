import React from 'react'
import { Redirect } from 'react-router-dom'
import { withAuth } from '../context/Auth'
import { Header, Link } from '../ui/Header'

export default withAuth(({ authContext: { isAuth, _logout } }) => (
  <Header>
    <Link to="/">Home</Link>
    {isAuth && <Link to="/books">Books</Link>}
    {isAuth && <Link to="/settings">Settings</Link>}
    {isAuth && <Link to="/trades">Trades</Link>}
    {isAuth ? (
      <Link to="/" onClick={_logout}>
        Logout
      </Link>
    ) : (
      <Link to="/signin">Sign in</Link>
    )}
  </Header>
))
