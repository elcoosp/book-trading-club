import React from 'react'
import { Query } from 'react-apollo'

export default ({ finalComp: Component, ...rest }) => {
  return (
    <Query {...rest}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>An error occured...</div>
        return <Component {...data} />
      }}
    </Query>
  )
}
