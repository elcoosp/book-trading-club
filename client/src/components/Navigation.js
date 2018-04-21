import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Nav = styled.div`
  background-color: ${p => p.theme.colors.brown};
  color: white;
`
export default () => {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/trades">Trades</Link>
      <Link to="/signin">Trades</Link>
    </Nav>
  )
}
