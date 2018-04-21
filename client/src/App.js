import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Books from './components/Books'
import Home from './components/Home'
import NewBook from './components/NewBook'
import Settings from './components/Settings'
import Trades from './components/Trades'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './components/SignIn'
import { AuthProvider } from './context/Auth'

class App extends Component {
  render() {
    return (
      <Fragment>
        <AuthProvider>
          <Navigation />
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/books" component={Books} />
          <ProtectedRoute path="/books/new" component={NewBook} />
          <ProtectedRoute exact path="/settings" component={Settings} />
          <ProtectedRoute exact path="/trades" component={Trades} />
          <Route exact path="/signin" component={SignIn} />
        </AuthProvider>
      </Fragment>
    )
  }
}

export default App
