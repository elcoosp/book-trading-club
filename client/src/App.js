import React, { Component } from 'react'

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_BOOKS = gql`
  query books {
    books {
      _id
      title
      author
    }
  }
`
class App extends Component {
  render() {
    return (
      <div>
        {' '}
        <Query query={GET_BOOKS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) console.log(error)
            else console.log(data)
            return <div>plop</div>
          }}
        </Query>{' '}
      </div>
    )
  }
}

export default App
