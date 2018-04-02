const to = require('await-to-js').to,
  Request = require('../models/Request')

module.exports = {
  async getAll(req, res) {
    const [e, requests] = await to(Request.find())

    e
      ? res.status(404).json({
          error: 'No request found'
        })
      : res.json(requests)
  },

  async getOne(req, res) {
    const { params: { id } } = req
    const [e, request] = await to(Request.findById(id))

    e
      ? res.status(404).json({
          error: 'No request found'
        })
      : res.json(request)
  },

  async addOne(req, res) {
    const { body } = req
    const [e, savedRequest] = await to(new Request(body).save())

    e
      ? res.status(404).json({
          error: 'Request not created'
        })
      : res.json(savedRequest)
  },

  async deleteOne(req, res) {
    const { params: { id } } = req
    const [e, deleteResult] = await to(Request.findById(id).remove())

    e || deleteResult.n === 0
      ? res.status(404).json({
          error: 'Request not deleted'
        })
      : res.status(200)
  }
}
