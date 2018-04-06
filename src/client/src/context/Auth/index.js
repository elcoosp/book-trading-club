import React, { Component } from 'react'
const { Provider, Consumer } = React.createContext()

export class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    user: null
  }
  render() {
    const { state, props: { children } } = this
    return (
      <Provider
        value={{
          S: state,
          A: {
            login: () =>
              !state.isLoggedIn &&
              this.setState(s => ({
                isLoggedIn: true,
                user: { name: 'SupaDupaUser' }
              })),

            logout: () =>
              state.isLoggedIn &&
              this.setState(s => ({
                isLoggedIn: false,
                user: null
              })),

            register: () => console.log('registering')
          }
        }}
      >
        {children}
      </Provider>
    )
  }
}

export const withAuth = Component => props => (
  <AuthConsumer>{auth => <Component {...props} auth={auth} />}</AuthConsumer>
)

export const AuthConsumer = Consumer
