const router = require('express').Router(),
  {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne
  } = require('../controllers/book')

router
  .get('/', getAll)
  .post('/', addOne)
  .get('/:id', getOne)
  .patch('/:id', updateOne)
  .delete('/:id', deleteOne)

module.exports = router