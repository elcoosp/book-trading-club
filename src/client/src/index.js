import React from 'react'
import ReactDOM from 'react-dom'
import Controller from './controller'
import { Container } from '@cerebral/react'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.getElementById('root')
)
registerServiceWorker()
