const Question = require('../models/Question')
class ControllerQuestion{
    static create(req,res,next){
        const {title, description} = req.body
        console.log(req.body);
        Question.create({title,description, User: req.decoded._id})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=> next(err))
    }

    static update(req,res,next){
        const {title,description} = req.body
        let bodyUpdate = {}
        if (title) bodyUpdate.title = title
        if (description) bodyUpdate.description = description
        Question.updateOne({_id: req.params.id},bodyUpdate)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>next(err))
    }

    static findAll(req,res,next){
        Question.find ()
        .populate('User','name')
        .sort({'updatedAt': -1})
        .then(data => res.json(data))
        .catch(err => next(err))
    }

    static findMine(req,res,next){
        Question.find ({User: req.decoded._id})
        .populate('User','name')
        .sort({'updatedAt': -1})
        .then(data => res.json(data))
        .catch(err => next(err))
    }

    static findOne(req,res,next){
        Question.findById(req.params.id)
        .populate('User','name')
        .then(data => res.json(data))
        .catch(err => next(err))
    }

    static deleteItem(req,res,next){
        Question.deleteOne({_id:req.params.id})
        .then(data => res.json({message: 'data has been deleted'}))
        .catch(err => next(err))
    }

    static upvotes(req,res,next){
        Question.findById(req.params.id)
        .then( data => {
            if (!data.upvotes.includes(req.decoded._id) && !data.downvotes.includes(req.decoded._id)) {
                Question.update({_id: req.params.id}, {$push : {"upvotes" : req.decoded._id}}) 
                .then(()=>{
                    res.status(200).json({message: 'votes counted'})
                })
                .catch(err=>{
                    next(err)
                })
            } else {
                res.status(401).json({message: 'You can only vote once'})
            }
        })
    }

    static downvotes(req,res,next){
        Question.findById(req.params.id)
        .then( data => {
            if (!data.upvotes.includes(req.decoded._id) && !data.downvotes.includes(req.decoded._id)) {
                Question.update({_id: req.params.id}, {$push : {"downvotes" : req.decoded._id}}) 
                .then(()=>{
                    res.status(200).json({message: 'votes counted'})
                })
                .catch(err=>{
                    next(err)
                })
            } else {
                res.status(401).json({message: 'You can only vote once'})
            }
        })


    }
}


module.exports = ControllerQuestion