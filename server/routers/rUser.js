const router = require('express').Router()
const UserController = require('../controllers/cUser')

router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router