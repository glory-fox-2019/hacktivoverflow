const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/AnswerController');
const Authentication = require('../middlewares/authen')

router.use(Authentication)

router.get('/', AnswerController.loadAnswer)
router.post('/', AnswerController.create)
router.post('/:id', AnswerController.voteAnswer)
router.put('/:id', AnswerController.editAnswer)

module.exports = router