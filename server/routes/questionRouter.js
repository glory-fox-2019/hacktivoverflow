const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', questionController.find)
router.get('/:id', questionController.findOne)
// router.get('/:id/mine', questionController.find)
router.post('/', questionController.create)
router.patch('/:id', questionController.update)
router.delete('/:id', questionController.delete)
router.patch('/:id/upvote', questionController.upvote)
router.patch('/:id/downvote', questionController.downvote)

module.exports = router