const pick = require('object.pick')

module.exports = {
  user: {
    formFields: body =>
      pick(body, ['nameFirst', 'username', 'nameLast', 'password']),
    sended: user =>
      pick(user, ['nameFirst', 'username', 'nameLast', 'id', 'books'])
  }
}
