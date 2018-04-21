import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: 'http://localhost:5000/'
})

const ApolloWithRouter = AppComponent => (
  <Router>
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  </Router>
)

render(ApolloWithRouter(App), document.getElementById('root'))
