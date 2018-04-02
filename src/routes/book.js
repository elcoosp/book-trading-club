const router = require('express').Router,
  {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne
  } = require('../controllers/book')

router
  .get('/', getAll)
  .get('/:id', getOne)
  .post('/:id', addOne)
  .update('/:id', updateOne)
  .delete('/:id', deleteOne)

module.exports = router
