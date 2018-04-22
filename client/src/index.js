import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import theme from './theme'

injectGlobal`
${styledNormalize}
`

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  request: operation =>
    new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem('token')

        return resolve(
          operation.setContext({
            headers: { authorization: `Bearer ${token}` }
          })
        )
      } catch (e) {
        return reject(e)
      }
    })
})

const ApolloRouterTheme = AppComponent => (
  <Router>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppComponent />
      </ThemeProvider>
    </ApolloProvider>
  </Router>
)

render(ApolloRouterTheme(App), document.getElementById('root'))
