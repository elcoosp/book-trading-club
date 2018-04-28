import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import React, { Component, Fragment } from 'react'
import QueryLoaderError from './QueryLoaderError'
import { SELECTION_SET } from 'graphql/language/kinds'
const GET_TRADES = gql`
  query requestedTrades {
    user {
      requestedTrades {
        _id
        accepted
        book {
          title
          owner {
            pseudo
          }
          author
        }
      }
    }
  }
`

export default class Trades extends Component {
  render() {
    return (
      <QueryLoaderError
        query={GET_TRADES}
        finalComp={({ user: { requestedTrades } }) => (
          <Fragment>
            <section>
              <h1>Requested trades</h1>
              {requestedTrades.map(({ _id, book, accepted }) => (
                <article key={_id}>
                  <h2>
                    {book.title} - {book.author}
                  </h2>
                  <h3>from {book.owner.pseudo}</h3>
                  <p>{accepted ? 'Request accepted' : 'Pending'}</p>
                </article>
              ))}
            </section>
          </Fragment>
        )}
      />
    )
  }
}
