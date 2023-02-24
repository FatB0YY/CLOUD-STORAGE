const Router = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const fileController = require('../controllers/file-controller')
const fileSchema = require('../schema/file-schema')
const validateRequestSchema = require('../error/validate-request-schema')
const router = new Router()

router.post(
  '',
  fileSchema,
  validateRequestSchema,
  authMiddleware,
  fileController.createDir
)
router.get('', authMiddleware, fileController.getFiles)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.get('/download', authMiddleware, fileController.downloadFile)
router.delete('/', authMiddleware, fileController.deleteFile)
router.get('/search', authMiddleware, fileController.searchFile)
router.post('/avatar', authMiddleware, fileController.uploadAvatar)
router.delete('/avatar', authMiddleware, fileController.deleteAvatar)

module.exports = router
