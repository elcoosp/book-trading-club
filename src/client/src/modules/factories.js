export const setIsAuthenticated = boolean => ({ state }) =>
  state.set('auth.isAuthenticated', boolean)

export const setError = (type, message) => ({ state }) =>
  state.set(`errors.${type}`, message)
