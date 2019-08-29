const express = require('express')
const router = express.Router()
const ControllerAnswer= require('../controllers/controllerAnswer')
const {authentication,authorizationAnswer} = require('../middlewares/auth')

router.get('/all/:id',ControllerAnswer.findAll)
router.get('/:id',ControllerAnswer.findOne)

router.use(authentication)
router.post('/',ControllerAnswer.create)
router.patch('/upvotes/:id',ControllerAnswer.upvotes)
router.patch('/downvotes/:id',ControllerAnswer.downvotes)
router.patch('/:id',authorizationAnswer,ControllerAnswer.update)

module.exports = router