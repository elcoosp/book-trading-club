import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Header = styled.header`
  background-image: ${p => p.theme.gradient.primary};
  min-height: 80px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  color: white;
`

export const Link = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding: ${p => p.theme.spacing.medium};
`
