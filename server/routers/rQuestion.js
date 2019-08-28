const router = require('express').Router()
const QuestionController = require('../controllers/cQuestion')
const authToken = require('../middlewares/authToken')
const authOwner = require('../middlewares/authOwner')

router.get('/find', QuestionController.getAll)
router.get('/find/collection', authToken, QuestionController.myCollection)
router.post('/create', authToken, QuestionController.create)
router.post('/delete/:id', authToken, authOwner, QuestionController.delete)
router.patch('/update/:id', authToken, authOwner)
router.post('/votes/:id', authToken, QuestionController.votes)
router.get('/find/:id',QuestionController.getById)

module.exports = router