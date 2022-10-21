const Router = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const fileController = require('../controllers/file-controller')
const router = new Router()

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.get('', authMiddleware, fileController.getFiles)

module.exports = router