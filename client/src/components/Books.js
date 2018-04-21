import { gql } from 'apollo-boost'
import QueryLoaderError from './QueryLoaderError'
import React, { Component } from 'react'
import { NULL } from 'graphql/language/kinds'
import { link } from 'fs'

const GET_BOOKS = gql`
  query {
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
      <QueryLoaderError
        query={GET_BOOKS}
        finalComp={({ books }) => (
          <ul>
            {books.map(({ title, author, _id }) => (
              <li key={_id}>
                <h1>{title}</h1> <h2>{author}</h2>
              </li>
            ))}
          </ul>
        )}
      />
    )
  }
}
