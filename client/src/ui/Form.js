import styled from 'styled-components'

export const Form = styled.form`
  text-align: center;
  max-width: 600px;

  width: 70vw;
  display: flex;
  flex-flow: column wrap;
  & :nth-child(n) {
    margin: ${p => p.theme.spacing.medium};
  }

  & input:nth-child(n) {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: ${p => p.theme.spacing.medium};
  }
`
