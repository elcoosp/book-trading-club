import * as A from './actions'
import * as F from './factories'

export const initialize = [
  A.getTokenFromLocalStorage,
  {
    success: [A.setAuthToken, F.setIsAuthenticated(true)],
    failure: [F.setIsAuthenticated(false)]
  }
]

export const login = [
  A.callLoginApi,
  {
    success: [
      A.setUser,
      A.setAuthToken,
      A.setTokenToLocalStorage,
      F.setIsAuthenticated(true)
    ],
    failure: [
      F.setError('login', 'Could  not login'),
      F.setIsAuthenticated(false)
    ]
  }
]

export const logout = [
  A.deleteTokenFromLocalStorage,
  {
    success: F.setIsAuthenticated(false),
    failure: F.setIsAuthenticated(true)
  }
]
