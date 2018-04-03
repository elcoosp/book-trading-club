export const setToken = ({ state }) => {
  try {
    const token = localStorage.getItem('token')

    state.set('auth.token', token)
    state.set('auth.isAuthenticated', token ? true : false)
  } catch (e) {
    state.set('auth.token', null)
    state.set('auth.isAuthenticated', false)
  }
}
