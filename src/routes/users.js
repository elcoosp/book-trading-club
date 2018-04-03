const router = require('express').Router(),
  passport = require('passport'),
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
  .post('/', addOne)
  .patch('/:id', passport.authenticate('jwt', { session: false }), updateOne)
  .delete('/:id', passport.authenticate('jwt', { session: false }), deleteOne)

module.exports = router
