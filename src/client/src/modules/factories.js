import to from 'await-to-js'

export const setIsAuthenticated = boolean => ({ state }) =>
  state.set('auth.isAuthenticated', boolean)

export const setError = (type, message) => ({ state }) =>
  state.set(`errors.${type}`, message)

export const addOne = ressource => async ({ http, path, props: { data } }) => {
  const [e, resp] = await to(
    http.post(`/api/${ressource}`, data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  )

  return e ? path.failure() : path.success({ user: resp.result })
}
