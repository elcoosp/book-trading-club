import to from 'await-to-js'

export const getTokenFromLocalStorage = ({ path }) => {
  try {
    const token = localStorage.getItem('token')
    return token ? path.success({ token }) : path.failure()
  } catch (e) {
    return path.failure()
  }
}

export const deleteTokenFromLocalStorage = ({ path }) => {
  try {
    localStorage.removeItem('token')
    return path.success()
  } catch (e) {
    return path.failure()
  }
}

export const setTokenToLocalStorage = ({ props: { token }, path }) => {
  try {
    localStorage.setItem('token', token)
  } catch (e) {
    return path.failure()
  }
}

export const setAuthToken = ({ props: { token }, state }) =>
  state.set('auth.token', token)

export const callLoginApi = async ({ props: { data }, http, path }) => {
  const [e, resp] = await to(
    http.post('/api/auth/login', data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  )

  return e
    ? path.failure()
    : path.success({ user: resp.result.user, token: resp.result.token })
}

export const getUser = async ({ props: { data }, http, path, state }) => {
  const token = state.get('auth.token')
  const [e, resp] = await to(
    http.get(
      '/api/auth/me',
      {},
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${token}`
        }
      }
    )
  )

  return e ? path.failure() : path.success({ user: resp.result.user })
}

export const setUser = ({ state, props: { user } }) =>
  state.set('auth.user', user)
