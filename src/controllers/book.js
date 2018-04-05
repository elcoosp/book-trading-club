const to = require('await-to-js').to,
  Book = require('../models/Book'),
  pick = require('object.pick')

const filterFields = body => pick(body, ['name', 'cover'])

module.exports = {
  async getAll(req, res) {
    const [e, books] = await to(Book.find())

    e
      ? res.status(404).json({
          error: 'No books found'
        })
      : res.json(books)
  },

  async getOne(req, res) {
    const { params: { id } } = req
    const [e, book] = await to(Book.findById(id))

    e
      ? res.status(404).json({
          error: 'No book found'
        })
      : res.json(book)
  },

  async addOne(req, res) {
    const { body, user } = req

    const [e, savedBook] = await to(
      new Book({ ...filterFields(body.formData), owner: user.id }).save()
    )
    console.log(savedBook)

    e
      ? res.status(404).json({
          error: 'Book not created'
        })
      : res.json(savedBook)
  },

  async updateOne(req, res) {
    const { params: { id }, body } = req
    const [e, updatedBook] = await to(
      Book.findByIdAndUpdate(id, filterFields(body), {
        runValidators: true,
        new: true
      })
    )

    e
      ? res.status(404).json({
          error: 'Book not updated'
        })
      : res.json(updatedBook)
  },

  async deleteOne(req, res) {
    const { params: { id } } = req
    const [e, deleteResult] = await to(Book.findById(id).remove())

    e || deleteResult.n === 0
      ? res.status(404).json({
          error: 'Book not deleted'
        })
      : res.status(200)
  }
}
