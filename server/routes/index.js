const router             = require('express').Router()
const AuthController     = require('../controllers/auth')
const UserController     = require('../controllers/user')
const QuestionRoute      = require('./question')
const AnswerRoute        = require('./answer')
const errorHandler       = require('../middlewares/errorHandler')
const { authentication } = require('../middlewares/auth')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.get('/tag', authentication, UserController.getMyTag)
router.patch('/', authentication, UserController.editWatchTag)

router.use('/questions', QuestionRoute)
router.use('/answers', AnswerRoute)

router.use(errorHandler)

module.exports = router
