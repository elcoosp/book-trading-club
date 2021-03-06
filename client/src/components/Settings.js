import { gql } from 'apollo-boost'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { notEmpty } from '../utils'
import { Title, Button, Main } from '../ui/Common'
import { Form } from '../ui/Form'

const withMutation = comp =>
  graphql(UPDATE_USER, { name: 'updateUserMutation' })(comp)
const UPDATE_USER = gql`
  mutation updateUser(
    $pseudo: String
    $password: String
    $fullName: String
    $city: String
    $state: String
  ) {
    updateUser(
      pseudo: $pseudo
      password: $password
      fullName: $fullName
      city: $city
      state: $state
    ) {
      pseudo
      fullName
      city
      state
    }
  }
`

export default withMutation(
  class Settings extends Component {
    state = {
      form: {
        pseudo: '',
        password: '',
        fullName: '',
        city: '',
        state: ''
      },

      error: null
    }

    onChange = ({ target: { value, name } }) =>
      this.setState(prevState => ({
        form: {
          ...prevState.form,
          [name]: value
        }
      }))

    onSubmit = e => {
      e.preventDefault()

      //Check if there is at least a change in the form
      if (Object.values(this.state.form).some(v => v.trim() != '')) {
        this.props
          .updateUserMutation({
            // Filter and send only changed fields
            variables: Object.entries(this.state.form).reduce(
              (acc, [key, val]) =>
                val.trim() != '' ? { ...acc, [key]: val } : acc,
              {}
            )
          })
          .then(console.log)
          .catch(({ graphQLErrors: [{ message }] }) =>
            this.setState(prevState => ({
              error: message
            }))
          )
      }
    }

    render() {
      const {
        form: { pseudo, password, fullName, city, state },
        error
      } = this.state

      return (
        <Main>
          <Title>Settings</Title>

          <Form onSubmit={this.onSubmit}>
            <label htmlFor="pseudo">Pseudo</label>
            <input
              name="pseudo"
              type="text"
              value={pseudo}
              onChange={this.onChange}
            />

            <label htmlFor="password">New password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.onChange}
            />

            <label htmlFor="fullName">Full name</label>
            <input
              name="fullName"
              type="text"
              value={fullName}
              onChange={this.onChange}
            />

            <label htmlFor="city">City</label>
            <input
              name="city"
              type="text"
              value={city}
              onChange={this.onChange}
            />

            <label htmlFor="state">State</label>
            <input
              name="state"
              type="text"
              value={state}
              onChange={this.onChange}
            />
            <Button type="submit">Change settings</Button>
          </Form>
          {error && <p>{error}</p>}
        </Main>
      )
    }
  }
)
