const router = require('express').Router();
const answer = require('./answer');

const question = require('../controllers/question');
const comment = require('../controllers/comment');

const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', question.findAll);
router.get('/:id', question.findOne);

router.use('/:idquestion/answer', answer);

router.use(authentication);

router.post('/', question.create);
router.put('/:id', authorization.question, question.edit);
router.delete('/:id', authorization.question, question.delete);

router.patch('/:id/upvote', question.upvote);
router.delete('/:id/upvote', question.cancelUpvote);

router.patch('/:id/downvote', question.downvote);
router.delete('/:id/downvote', question.cancelDownvote);

router.post('/:idquestion/comment', comment.createOnQuestion);

module.exports = router;