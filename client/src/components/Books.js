import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import QueryLoaderError from './QueryLoaderError'

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
      <Fragment>
        <Link to="/books/new">Add a new book</Link>
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
      </Fragment>
    )
  }
}
