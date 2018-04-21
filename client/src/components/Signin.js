import { gql } from 'apollo-boost'
import React, { Component } from 'react'
import { AuthConsumer } from '../context/Auth'
import { Mutation } from 'react-apollo'
export default class SignIn extends Component {
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
  }

  render() {
    const { isLoginMode, password, pseudo } = this.state
    return (
      <AuthConsumer>
        {({ _login }) => (
          <main>
            <form onSubmit={this.onSubmit}>
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
              <button type="submit">
                {isLoginMode ? 'Login' : 'Register'}
              </button>
            </form>
            <button onClick={this.toggleFormMode}>
              {isLoginMode ? 'Or Register' : 'Or login'}
            </button>
          </main>
        )}
      </AuthConsumer>
    )
  }
}
