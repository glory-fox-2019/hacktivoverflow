const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const UserController = require('../controllers/user-controller')

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)

router.use(auth.authentication)

router.get('/', UserController.getOne)
router.patch('/watch-tag', UserController.watchTag)

module.exports = router