module.exports = {
  arrayWrap: v => (!v ? [] : Array.isArray(v) ? v : [v]),

  without: ([field]) => obj =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      key !== field && (acc[key] = value)
      return acc
    }, {})
}
