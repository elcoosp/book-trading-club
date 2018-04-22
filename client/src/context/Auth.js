import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation, graphql } from 'react-apollo'

const { Provider, Consumer } = React.createContext()

const LOGIN = gql`
  mutation login($pseudo: String!, $password: String!) {
    login(pseudo: $pseudo, password: $password) {
      token
    }
  }
`

const withLoginMutation = Component => props => (
  <Mutation mutation={LOGIN}>
    {login => <Component loginMutation={login} {...props} />}
  </Mutation>
)

export const AuthProvider = withLoginMutation(
  class AuthProv extends React.Component {
    state = { isAuth: false }
    _login = data => {
      this.props.loginMutation(data).then(console.log)

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
)

export const withAuth = Component => props => (
  <Consumer>{auth => <Component {...auth} {...props} />}</Consumer>
)
export const AuthConsumer = Consumer
