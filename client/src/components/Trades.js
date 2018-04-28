import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import React, { Component } from 'react'

const GET_TRADES = gql`
  query trades {
    user {
      requestedTrades {
        accepted
        book {
          title
          author
        }
      }
    }
  }
`

export default class Trades extends Component {
  render() {
    return (
      <Query query={GET_TRADES}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>
          if (error) console.log(error)
          else console.log(data)
          return <div>plop</div>
        }}
      </Query>
    )
  }
}
