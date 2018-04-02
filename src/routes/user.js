const router = require('express').Router(),
  {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne
  } = require('../controllers/user')

router
  .get('/', getAll)
  .get('/:id', getOne)
  .post('/:id', addOne)
  .patch('/:id', updateOne)
  .delete('/:id', deleteOne)

module.exports = router
