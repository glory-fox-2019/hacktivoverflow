const Question = require('../models/question')

class QuestionController {
    static create(req, res, next) {
        const { title, content, tags } = req.body;
        const author = req.decoded._id;

        Question.create({ title, content, author, tags })
        .then( data => {
            res.status(201).json(data)
        })
        .catch(next)
    }
    
    static findAll(req, res, next) {
        Question.find().populate(['author','tags']).sort('-createdAt')
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        const id = req.params.questionId
        
        Question.findById(id).populate(['author','tags'])
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteOne(req, res, next) {
        const id = req.params.questionId

        Question.findByIdAndDelete(id)
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateOne(req, res, next) {
        const id = req.params.questionId
        let update = {}

        req.body.title && (update.title = req.body.title)
        req.body.content && (update.content = req.body.content)                

        Question.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true })
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static vote(req, res, next) {
        const id = req.params.questionId
        const user = req.decoded._id

        let addVotes = {}
        let removeVotes = {}

        const { voteValue } = req.body

        if(voteValue == true){
            addVotes.upvotes = user
            removeVotes.downvotes = user
        } else if (voteValue == false) {
            addVotes.downvotes = user
            removeVotes.upvotes = user
        }

        Question.findByIdAndUpdate(id, { $pull: { ...removeVotes,...addVotes } }, { new: true, runValidators: true })
        .then( () => {
            return Question.findByIdAndUpdate(id, { $push: addVotes, $pull: removeVotes }, { new: true, runValidators: true })
        })       
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteVote(req, res, next){
        const id = req.params.questionId
        const user = req.decoded._id

        let votes = {}
        votes.upvotes = user
        votes.downvotes = user

        Question.findByIdAndUpdate(id, { $pull: votes }, { new: true, runValidators: true })
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = QuestionController