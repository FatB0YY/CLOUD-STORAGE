const Router = require('express')
const userController = require('../controllers/user-controller')
const { body } = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')
const router = new Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 128 }),
  userController.registration
)
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 128 }),
  userController.login
)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router

// 1. email не приходит
// 2. пользователь не авторизован