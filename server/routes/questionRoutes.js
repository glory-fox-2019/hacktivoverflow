const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authentication} = require('../middlewares/authentication')

router.get('/findAll', QuestionController.findAll)
router.get('/detail/:id', QuestionController.findById)
router.post('/tag', QuestionController.findByTag)
router.use(authentication)
router.post('/create', QuestionController.create)
router.get('/userQuestion', QuestionController.userQuestion)
router.post('/upvotes/:id', QuestionController.upvotes)
router.post('/downvotes/:id', QuestionController.downvotes)
router.delete('/:id', QuestionController.delete)
router.patch('/:id', QuestionController.update)

module.exports = router