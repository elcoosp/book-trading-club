import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import QueryLoaderError from './QueryLoaderError'
import { log } from 'util'
import { Mutation } from 'react-apollo'

const GET_BOOKS = gql`
  query {
    books {
      _id
      title
      author
    }
  }
`

const REQUEST_TRADE = gql`
  mutation requestTrade($bookId: String!) {
    requestTrade(book: $bookId) {
      _id
    }
  }
`

export default class Books extends Component {
  state = {
    requestTrade: {
      error: null
    }
  }

  render() {
    return (
      <Fragment>
        <Link to="/books/new">Add a new book</Link>
        <QueryLoaderError
          query={GET_BOOKS}
          finalComp={({ books }) => (
            <Mutation mutation={REQUEST_TRADE}>
              {(requestTrade, data) => (
                <ul>
                  {this.state.requestTrade.error && (
                    <p>{this.state.requestTrade.error}</p>
                  )}
                  {this.state.requestTrade.success && (
                    <p>{this.state.requestTrade.success}</p>
                  )}

                  {books.map(({ title, author, _id }) => (
                    <li key={_id}>
                      <h1>{title}</h1>
                      <h2>{author}</h2>

                      <button
                        onClick={() =>
                          requestTrade({ variables: { bookId: _id } })
                            .then(data =>
                              this.setState(prevState => ({
                                requestTrade: {
                                  success: `${title} was successfully requested`
                                }
                              }))
                            )
                            .catch(e =>
                              this.setState(prevState => ({
                                requestTrade: {
                                  error:
                                    'Could not request trade, an error  occured'
                                }
                              }))
                            )
                        }
                      >
                        Request Trade
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Mutation>
          )}
        />
      </Fragment>
    )
  }
}
