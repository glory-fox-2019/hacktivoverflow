const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authentication} = require('../middlewares/authentication')


router.use(authentication)
router.get('/find/:id', AnswerController.findById)
router.post('/create/:id', AnswerController.create)
router.post('/upvotes/:id', AnswerController.upvotes)
router.post('/downvotes/:id', AnswerController.downvotes)
router.delete('/:id', AnswerController.delete)
router.patch('/:id', AnswerController.update)


module.exports = router