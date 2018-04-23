import React, { Component } from 'react'
import { withAuth } from '../context/Auth'

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
    this.props.authContext[isLoginMode ? '_login' : '_addUser']({
      variables: { password, pseudo }
    })
    this.setState(prevState => ({
      password: '',
      pseudo: ''
    }))
  }

  render() {
    const { isLoginMode, password, pseudo } = this.state
    const { isAuth } = this.props
    return (
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
          <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
        </form>
        <button onClick={this.toggleFormMode}>
          {isLoginMode ? 'Or Register' : 'Or login'}
        </button>
      </main>
    )
  }
}

export default withAuth(SignInForm)
