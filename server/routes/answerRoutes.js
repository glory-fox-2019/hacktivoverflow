const router = require('express').Router();
const AnswerController = require('../controller/answerController');
const { Authentication, Authorization } = require('../middleware/authentication');

router.use(Authentication);
router.get('/:id', AnswerController.readOne);
router.post('/:id', AnswerController.create);
router.patch('/vote/:id', AnswerController.vote);

module.exports = router;