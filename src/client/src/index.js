import React from 'react'
import ReactDOM from 'react-dom'
import controller from './modules/controller'
import { Container } from '@cerebral/react'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import App from './components/App'

ReactDOM.render(
  <Container controller={controller}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Container>,
  document.getElementById('root')
)
registerServiceWorker()
