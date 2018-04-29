import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import QueryLoaderError from './QueryLoaderError'
import { log } from 'util'
import { Mutation } from 'react-apollo'
import { Title, ButtonLink, Button, Main } from '../ui/Common'

const GET_BOOKS = gql`
  query {
    user {
      requestedTrades {
        book {
          _id
        }
      }
    }
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
      <Main>
        <Title>Books</Title>

        <ButtonLink to="/books/new">Add a new book</ButtonLink>
        <QueryLoaderError
          query={GET_BOOKS}
          finalComp={({ books, user }) => (
            <Mutation mutation={REQUEST_TRADE}>
              {(requestTrade, data) => (
                <ul>
                  {this.state.requestTrade.error && (
                    <p>{this.state.requestTrade.error}</p>
                  )}
                  {this.state.requestTrade.success && (
                    <p>{this.state.requestTrade.success}</p>
                  )}

                  {books.map(({ title, author, _id }) => {
                    return (
                      <li key={_id}>
                        <h1>{title}</h1>
                        <h2>{author}</h2>
                        {!user.requestedTrades.some(
                          trade => trade.book._id === _id
                        ) && (
                          <Button
                            secondary
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
                          </Button>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </Mutation>
          )}
        />
      </Main>
    )
  }
}
