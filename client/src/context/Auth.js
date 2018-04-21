import React from 'react'
const { Provider, Consumer } = React.createContext()

export class AuthProvider extends React.Component {
  state = { isAuth: false }
  _login = () => {
    this.setState(prevState => ({
      isAuth: true
    }))
  }

  _logout = () => {
    this.setState(prevState => ({
      isAuth: false
    }))
  }
  render() {
    return (
      <Provider
        value={{
          isAuth: this.state.isAuth,
          _login: this._login,
          _logout: this._logout
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export const AuthConsumer = Consumer
