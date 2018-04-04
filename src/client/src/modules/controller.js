import { Controller, Module } from 'cerebral'
import { initialize, login, logout } from './sequences'
import HttpProvider from '@cerebral/http'
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
      token: null,
      user: null
    },
    errors: {
      user: null
    }
  },
  signals: {
    initialize,
    login,
    logout
  },
  providers: {
    http: HttpProvider()
  }
})

export default Controller(app, {
  devtools
})
