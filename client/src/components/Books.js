import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import React, { Component } from 'react'

const GET_BOOKS = gql`
  query books {
    books {
      _id
      title
      author
    }
  }
`

export default class Books extends Component {
  render() {
    return (
      <Query query={GET_BOOKS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>
          if (error) console.log(error)
          else console.log(data)
          return <div>books</div>
        }}
      </Query>
    )
  }
}
