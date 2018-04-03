import { Controller, Module } from 'cerebral'
import { initialize } from './sequences'
import Devtools from 'cerebral/devtools'

let devtools = null
if (process.env.IS_DEVELOPING) {
  devtools = require('cerebral/devtools').default({
    host: 'localhost:8585',
    reconnect: true
  })
}

const app = Module({
  state: {
    auth: {
      isAuthenticated: false,
      token: null
    }
  },
  signals: {
    initialize
  }
})

export default Controller(app, {
  devtools
})
