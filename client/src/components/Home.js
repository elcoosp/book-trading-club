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
    return <div>Home</div>
  }
}
