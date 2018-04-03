const to = require('await-to-js').to,
  User = require('../models/User'),
  pick = require('object.pick')

const filterFields = body =>
  pick(body, ['nameFirst', 'username', 'nameLast', 'password'])

module.exports = {
  async getAll(req, res) {
    const [e, users] = await to(User.find({}, '-password'))

    e
      ? res.status(404).json({
          error: 'No users found'
        })
      : res.json(users)
  },

  async getOne(req, res) {
    const { params: { id } } = req
    const [e, user] = await to(User.findById(id, '-password'))

    e
      ? res.status(404).json({
          error: 'No user found'
        })
      : res.json(user)
  },

  async addOne(req, res) {
    const [e, savedUser] = await to(new User(filterFields(req.body)).save())

    e
      ? res.status(404).json({
          error: 'User not created'
        })
      : res.json(savedUser)
  },

  async updateOne(req, res) {
    const { params: { id }, body } = req
    const [e, updatedUser] = await to(
      User.findByIdAndUpdate(id, filterFields(body), {
        runValidators: true,
        new: true
      })
    )

    e
      ? res.status(404).json({
          error: 'User not updated'
        })
      : res.json(updatedUser)
  },

  async deleteOne(req, res) {
    const { params: { id } } = req
    const [e, deleteResult] = await to(User.findById(id).remove())

    e || deleteResult.n === 0
      ? res.status(404).json({
          error: 'User not deleted'
        })
      : res.status(200)
  }
}
