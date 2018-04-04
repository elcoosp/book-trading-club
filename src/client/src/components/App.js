import React, { Component, Fragment } from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import { Route, withRouter } from 'react-router'
import Home from './Home'
import MyBooks from './MyBooks'
import Requests from './Requests'
import Navigation from './Navigation'
import Settings from './Settings'
import SignIn from './SignIn'

class App extends Component {
  componentDidMount = () => {
    this.props._initialize()
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <div>
        <Navigation />
        <Route exact path="/" component={Home} />
        {isAuthenticated && (
          <Fragment>
            <Route path="/settings" component={Settings} />
            <Route path="/mybooks" component={MyBooks} />
            <Route path="/requests" component={Requests} />
          </Fragment>
        )}
        <Route path="/signin" component={SignIn} />
      </div>
    )
  }
}

export default withRouter(
  connect(
    {
      _initialize: signal`initialize`,
      isAuthenticated: state`auth.isAuthenticated`
    },
    App
  )
)
