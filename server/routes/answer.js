const router = require('express').Router({mergeParams: true});

const answer = require('../controllers/answer');
const comment = require('../controllers/comment');

const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);

router.post('/:idanswer/comment', comment.createOnAnswer);

router.post('/', answer.create);
router.put('/:idanswer', authorization.answer, answer.edit);
router.delete('/:idanswer', authorization.answer, answer.delete);

router.patch('/:idanswer/upvote', answer.upvote);
router.patch('/:idanswer/netralvote', answer.netralvote);
router.patch('/:idanswer/downvote', answer.downvote);

module.exports = router;