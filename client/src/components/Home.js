import React, { Component } from 'react'
import styled from 'styled-components'
const HomeMain = styled.main`
  background-color: ${p => p.theme.colors.dark};
`

export default class Home extends Component {
  render() {
    return (
      <HomeMain>
        <h1>Book trading club</h1>
        <p>Welcome abroad</p>
      </HomeMain>
    )
  }
}
