const router = require('express').Router(),
  passport = require('passport'),
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
  .post('/', passport.authenticate('jwt', { session: false }), addOne)
  .patch('/:id', passport.authenticate('jwt', { session: false }), updateOne)
  .delete('/:id', passport.authenticate('jwt', { session: false }), deleteOne)

module.exports = router
