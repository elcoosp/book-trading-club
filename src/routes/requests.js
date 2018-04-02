const router = require('express').Router(),
  { getAll, getOne, addOne, deleteOne } = require('../controllers/request')

router
  .get('/', getAll)
  .post('/', addOne)
  .get('/:id', getOne)
  .delete('/:id', deleteOne)

module.exports = router
