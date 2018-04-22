import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation, graphql } from 'react-apollo'

import { withRouter } from 'react-router-dom'
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

export const AuthProvider = withRouter(
  withLoginMutation(
    class AuthProv extends React.Component {
      state = { isAuth: false, errors: { login: null } }
      _login = data => {
        this.props
          .loginMutation(data)
          .then(({ data: { login: { token } } }) => {
            try {
              localStorage.setItem('token', token)
              this.setState(prevState => ({
                isAuth: true
              }))
              this.props.history.push('/books')
            } catch (e) {
              throw new Error('Could not store token')
            }
          })
          .catch(e => {
            this.setState(prevState => ({
              isAuth: false,
              errors: { login: e }
            }))
          })
      }

      _logout = () => {
        try {
          localStorage.removeItem('token')
          this.setState(prevState => ({
            isAuth: false
          }))
        } catch (e) {
          console.log(e)
        }
      }

      _initAuthState = () => {
        try {
          const token = localStorage.getItem('token')
          this.setState(prevState => ({
            isAuth: token ? true : false
          }))
        } catch (e) {
          this.setState(prevState => ({
            isAuth: false
          }))
        }
      }
      componentDidMount = () => {
        this._initAuthState()
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
)

export const withAuth = Component => props => (
  <Consumer>{auth => <Component {...auth} {...props} />}</Consumer>
)
export const AuthConsumer = Consumer
