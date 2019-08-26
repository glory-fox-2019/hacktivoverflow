const router = require('express').Router();
const questionContoller = require('../controllers/question');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorizationQuestion');


router.use(authentication);
router.post('/', questionContoller.create);
router.get('/', questionContoller.findAll);
router.get('/:id', questionContoller.findOne);
router.post('/upvote/:id', questionContoller.upvote);
router.post('/downvote/:id', questionContoller.downvote);
router.post('/tags/:id', authorization, questionContoller.addTags);
router.get('/tags/:tag', questionContoller.getTags);
router.delete('/:id', authorization, questionContoller.deleteQuestion);

module.exports = router;