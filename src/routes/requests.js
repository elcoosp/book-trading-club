const router = require('express').Router(),
  passport = require('passport'),
  { getAll, getOne, addOne, deleteOne } = require('../controllers/request')

router
  .get('/', getAll)
  .get('/:id', getOne)
  .post('/', passport.authenticate('jwt', { session: false }), addOne)
  .delete('/:id', passport.authenticate('jwt', { session: false }), deleteOne)

module.exports = router
