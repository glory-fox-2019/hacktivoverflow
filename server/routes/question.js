const router = require('express').Router();
const QuestionController = require('../controllers/question');
const authentication = require('../middlewares/authentication');
const CreateTag = require('../middlewares/create-tag');
const { authQuestions } = require('../middlewares/authorization');

router.use(authentication)
router.get('/', QuestionController.findAll);
router.post('/', CreateTag, QuestionController.create);

router.get('/:questionId', QuestionController.findOne);
router.use('/:questionId', authQuestions);
router.patch('/:questionId',CreateTag, QuestionController.updateOne);
router.put('/:questionId', QuestionController.vote);
router.put('/:questionId/remove', QuestionController.deleteVote);
router.delete('/:questionId', QuestionController.deleteOne);

module.exports = router