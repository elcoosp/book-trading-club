import React, { Component } from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import { Route, withRouter, Switch } from 'react-router'
import Home from './Home'
import MyBooks from './MyBooks'
import Requests from './Requests'
import Navigation from './Navigation'
import Settings from './Settings'
import SignIn from './SignIn'

class App extends Component {
  componentDidMount = () => {
    this.props.initialize()
  }

  render() {
    const { isAuthenticated } = this.props
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/mybooks" component={MyBooks} />
          <Route path="/requests" component={Requests} />
          {isAuthenticated && <Route path="/settings" component={Settings} />}
          <Route path="/signin" component={SignIn} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(
  connect(
    {
      initialize: signal`initialize`,
      isAuthenticated: state`auth.isAuthenticated`
    },
    App
  )
)
