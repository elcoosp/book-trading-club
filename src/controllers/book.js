const to = require('await-to-js').to,
  axios = require('axios'),
  pick = require('object.pick'),
  Book = require('../models/Book')

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
    const { body: { formData }, user } = req
    // Grab a thumbnail from google API
    const [booksApiError, matchingBooks] = await to(
      axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=+intitle:${
          formData.name
        }`
      )
    )
    const cover =
      booksApiError || matchingBooks.data.totalItems === 0
        ? 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
        : matchingBooks.data.items[0].imageLinks.smallThumbnail

    const [e, savedBook] = await to(
      new Book({ ...filterFields(formData), owner: user.id, cover }).save()
    )

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
