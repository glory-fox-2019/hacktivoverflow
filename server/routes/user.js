const router = require('express').Router();
const UserController = require('../controllers/user');
const authentication = require('../middlewares/authentication');

router.post('/register', UserController.signUp);
router.post('/login', UserController.signIn);
router.post('/login/google', UserController.googleSignIn);

router.use(authentication);
router.get('/tags', UserController.findWatchedTags);
router.put('/tags', UserController.addWatchedTags);
router.delete('/tags', UserController.removeWatchedTags);

module.exports = router;