const router = require('express').Router();
const QuestionController = require('../controller/questionController');
const { Authentication, Authorization } = require('../middleware/authentication');

router.use(Authentication);
router.post('/', QuestionController.create);
router.get('/', QuestionController.readAll);
router.get('/:id', QuestionController.readOne);
router.patch('/vote/:id', QuestionController.vote);
router.patch('/:id', Authorization, QuestionController.edit);
router.delete('/:id', Authorization, QuestionController.delete);

module.exports = router;
