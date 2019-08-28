const Answer = require('../models/answer')

class answerController {
    static find(req, res, next) {
        Answer.find().populate('userId')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        let id = req.params.id
        Answer.find({questionId: id}).populate('userId')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }  

    static create(req, res, next) {
        let { id } = req.decode
        let questionId = req.params.id
        let {content} = req.body
        Answer.create({
            content,
            questionId,
            userId : id,
            upVote: [],
            downVote: []
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let { id } = req.params
        let { content } = req.body
        Answer.findByIdAndUpdate(id, content, {new: true, runValidators: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Answer.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(200).json({message: 'Answer deleted'})
        })
        .catch(next)
    }

    static upvote(req, res, next) {
        let { id } = req.params
        let userId = req.decode.id
        Answer.findById(id)
        .then(answer => {
            let check = true
            for(let i = 0; i < answer.upVote.length; i++) {
                if (answer.upVote[i] == userId) {
                    check = false
                }
            }
            for (let j = 0; j < answer.downVote.length; j++) {
                if (answer.downVote[j] == userId) {
                    check = false
                    Answer.findByIdAndUpdate(id, {$pull: {downVote: userId}}, {new: true, runValidators: true})
                    .then(result => {
                        res.status(200).json({message: 'removed down vote'})
                    })
                    .catch(next)
                }
            }

            if(check) {
                Answer.findByIdAndUpdate(id, {$push: {upVote: userId}}, {new: true, runValidators: true})
                .then(result => {
                    res.status(200).json({message: 'add upvote'})
                })
                .catch(next)
            } else {
                res.status(200).json({message: 'already upvote'})
            }
        })
        .catch(next)
    }

    static downvote(req, res, next) {
        let { id } = req.params
        let userId = req.decode.id
        Answer.findById(id)
        .then(answer => {
            console.log(answer)
            let check = true
            for(let i = 0; i < answer.downVote.length; i++) {
                if (answer.downVote[i] == userId) {
                    check = false
                }
            }
            for (let j = 0; j < answer.upVote.length; j++) {
                if (answer.upVote[j] == userId) {
                    check = false
                    Answer.findByIdAndUpdate(id, {$pull: {upVote: userId}}, {new: true, runValidators: true})
                    .then(result => {
                        res.status(200).json({message: 'removed up vote'})
                    })
                    .catch(next)
                }
            }

            if(check) {
                Answer.findByIdAndUpdate(id, {$push: {downVote: userId}}, {new: true, runValidators: true})
                .then(result => {
                    res.status(200).json({message: 'add downvote'})
                })
                .catch(next)
            } else {
                res.status(200).json({message: 'already downvote'})
            }
        })
        .catch(next)
    }
}

module.exports = answerController