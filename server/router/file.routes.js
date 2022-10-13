const Router = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const fileController = require('../controllers/file-controller')
const router = new Router()

router.post('', authMiddleware, fileController.createDir)
router.get('', authMiddleware, fileController.getFiles)

module.exports = router