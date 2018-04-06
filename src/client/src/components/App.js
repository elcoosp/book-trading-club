import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router'
import Home from './Home'
import MyBooks from './MyBooks'
import Requests from './Requests'
import Navigation from './Navigation'
import Settings from './Settings'
import SignIn from './SignIn'
import { AuthProvider, withAuth } from '../context/Auth'

const AppRoutes = withRouter(
  withAuth(({ auth: { S: isLoggedIn } }) => (
    <Fragment>
      <Route exact path="/" component={Home} />
      {isLoggedIn && (
        <Fragment>
          <Route path="/settings" component={Settings} />
          <Route path="/mybooks" component={MyBooks} />
          <Route path="/requests" component={Requests} />
        </Fragment>
      )}
      <Route path="/signin" component={SignIn} />
    </Fragment>
  ))
)

class App extends Component {
  render() {
    return (
      <div>
        <AuthProvider>
          <Navigation />
          <AppRoutes />
        </AuthProvider>
      </div>
    )
  }
}

export default App
