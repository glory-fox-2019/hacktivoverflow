const AnswerController = require('../controllers/cAnswer')
const router = require('express').Router()
const authToken = require('../middlewares/authToken')
const authOwnerAnswer = require('../middlewares/authOwnerAnswer')

router.post('/votes/:id' , authToken, AnswerController.votes)
router.post('/:id', authToken, AnswerController.create)
router.patch('/update/:id', authToken, authOwnerAnswer, AnswerController.update)
router.delete('/:id', authToken, authOwnerAnswer, AnswerController.deleteAnswer)

module.exports = router