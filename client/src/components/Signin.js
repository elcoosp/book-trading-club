import React, { Component } from 'react'
import { withAuth } from '../context/Auth'
import { notEmpty } from '../utils'
import { Title, Button, Main } from '../ui/Common'
import { Form } from '../ui/Form'

class SignInForm extends Component {
  state = {
    isLoginMode: true,
    password: '',
    pseudo: ''
  }

  toggleFormMode = () =>
    this.setState(prevState => ({
      isLoginMode: !prevState.isLoginMode
    }))

  onChange = ({ target: { value, name } }) =>
    this.setState(prevState => ({
      [name]: value
    }))

  onSubmit = e => {
    e.preventDefault()
    const { isLoginMode, password, pseudo } = this.state
    if (notEmpty(password, pseudo)) {
      this.props.authContext[isLoginMode ? '_login' : '_addUser']({
        variables: { password, pseudo }
      })
      this.setState(prevState => ({
        password: '',
        pseudo: ''
      }))
    }
  }

  render() {
    const { isLoginMode, password, pseudo } = this.state
    const errors = this.props.authContext.errors[
      isLoginMode ? 'login' : 'addUser'
    ]

    return (
      <Main>
        <Title>{isLoginMode ? 'Login' : 'Register a new account'}</Title>
        <Form onSubmit={this.onSubmit}>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            name="pseudo"
            type="text"
            value={pseudo}
            onChange={this.onChange}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.onChange}
          />
          <Button type="submit">{isLoginMode ? 'Login' : 'Register'}</Button>
        </Form>
        <Button onClick={this.toggleFormMode} secondary>
          {isLoginMode ? 'Or Register' : 'Or login'}
        </Button>

        {errors && <p>{errors}</p>}
      </Main>
    )
  }
}

export default withAuth(SignInForm)
