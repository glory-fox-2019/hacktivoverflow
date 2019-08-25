const router = require('express').Router();
const comment = require('../controllers/comment');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);

router.put('/:id', authorization.comment, comment.edit);
router.delete('/:id', authorization.comment, comment.delete);

module.exports = router;