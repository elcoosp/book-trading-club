import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Books from './components/Books'
import Home from './components/Home'
import NewBook from './components/NewBook'
import Settings from './components/Settings'
import Trades from './components/Trades'
import { FragmentsOnCompositeTypes } from 'graphql'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/books" component={Books} />
        <Route path="/books/new" component={NewBook} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/trades" component={Trades} />
      </Fragment>
    )
  }
}

export default App
