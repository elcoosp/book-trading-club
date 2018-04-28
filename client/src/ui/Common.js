import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const Title = styled.h1`
  text-align: center;
`

export const Button = styled.button`
  cursor: pointer;
  color: white;
  padding: ${p => p.theme.spacing.medium};
  box-shadow: ${p => p.theme.shadow.small};
  text-decoration: none;

  ${p =>
    p.secondary
      ? css`
          background-color: white;
          border: 1px solid black;
          color: black;
        `
      : css`
          background-image: ${p => p.theme.gradient.primary};
          border: none;
        `};
`
export const ButtonLink = Button.withComponent(Link)
export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
