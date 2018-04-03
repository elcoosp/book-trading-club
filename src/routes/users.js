const router = require('express').Router(),
  passport = require('passport'),
  checkAuth = require('../middlewares/checkAuth'),
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
  .patch(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAuth,
    updateOne
  )
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAuth,
    deleteOne
  )

module.exports = router
