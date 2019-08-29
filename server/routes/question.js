const express = require('express')
const router = express.Router()
const ControllerQuestion= require('../controllers/ControllerQuestion')
const {authentication,authorization} = require('../middlewares/auth')

router.get('/',ControllerQuestion.findAll)
router.get('/:id',ControllerQuestion.findOne)

router.use(authentication)
router.post('/',ControllerQuestion.create)
router.get('/list/myquestion',ControllerQuestion.findMine)
router.patch('/upvotes/:id',ControllerQuestion.upvotes)
router.patch('/downvotes/:id',ControllerQuestion.downvotes)

router.patch('/:id',authorization,ControllerQuestion.update)
router.delete('/:id',authorization,ControllerQuestion.deleteItem)



module.exports = router