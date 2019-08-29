const Answer = require('../models/Answer')
class ControllerAnswer{
    static create(req,res,next){
        const {title, description, QuestionId} = req.body
        console.log(req.body);
        Answer.create({title,description, QuestionId, User: req.decoded._id})
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
       Answer.updateOne({_id: req.params.id},bodyUpdate)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>next(err))
    }

    static findAll(req,res,next){
        Answer.find ({QuestionId: req.params.id})
        .populate('User','name')
        .sort({'updatedAt': -1})
        .then(data => res.json(data))
        .catch(err => next(err))    }


    static findOne(req,res,next){
        Answer.findById(req.params.id)
        .populate('User','name')
        .then(data => res.json(data))
        .catch(err => next(err))
    }

    static upvotes(req,res,next){
        Answer.findById(req.params.id)
        .then( data => {
            if (!data.upvotes.includes(req.decoded._id) && !data.downvotes.includes(req.decoded._id)) {
                Answer.update({_id: req.params.id}, {$push : {"upvotes" : req.decoded._id}}) 
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
        Answer.findById(req.params.id)
        .then( data => {
            if (!data.upvotes.includes(req.decoded._id) && !data.downvotes.includes(req.decoded._id)) {
                Answer.update({_id: req.params.id}, {$push : {"downvotes" : req.decoded._id}}) 
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


module.exports = ControllerAnswer