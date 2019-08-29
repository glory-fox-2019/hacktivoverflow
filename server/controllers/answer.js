const Answer = require('../models/answer')

class AnswerController {
    static create(req, res, next) {
        const { questionId, content } = req.body;
        const author = req.decoded._id;

        Answer.create({ content, author, questionId })
        .then( data => {
            res.status(201).json(data)
        })
        .catch(next)
    }
    
    static findAll(req, res, next) {
        Answer.find({ questionId: req.params.questionId }).populate(['author','questionId'])
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        const id = req.decoded._id
        
        Answer.findById(id).populate(['author','questionId'])
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteOne(req, res, next) {
        const id = req.decoded._id

        Answer.findByIdAndDelete(id).populate(['author','questionId'])
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateOne(req, res, next) {
        const id = req.decoded._id
        let update = {}

        req.body.title && (update.title = req.body.title)
        req.body.content && (update.content = req.body.content)                

        Answer.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true }).populate(['author','questionId'])
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static vote(req, res, next) {
        const id = req.decoded._id
        let addVotes = {}
        let removeVotes = {}

        if(voteValue === 1){
            addVotes.upvotes = id
            removeVotes.downvotes = id
        } else if (voteValue === -1) {
            addVotes.downvotes = id
            removeVotes.upvotes = id
        }
        

        Answer.findByIdAndUpdate(id, { $push: addVotes, $pull: removeVotes }, { new: true, runValidators: true })
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteVote(req, res, next){
        const id = req.decoded._id

        let votes = {}
        votes.upvotes = id
        votes.downvotes = id

        Answer.findByIdAndUpdate(id, { $pull: votes }, { new: true, runValidators: true })
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = AnswerController