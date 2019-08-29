const router = require('express').Router();
const UserContoller = require('../controller/userController');

router.post('/sign-up', UserContoller.create);
router.post('/sign-in', UserContoller.login);

module.exports = router;