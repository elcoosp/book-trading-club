module.exports = ({ params: { id }, user }, res, next) =>
  user.id === id ? next() : res.status(401)
