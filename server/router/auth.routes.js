const Router = require('express')
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middleware/auth-middleware')
const validateRequestSchema = require('../error/validate-request-schema')
const authSchema = require('../schema/auth-schema')
const router = new Router()

router.post(
  '/registration',
  authSchema,
  validateRequestSchema,
  userController.registration
)
router.post('/login', authSchema, validateRequestSchema, userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router
