const Question = require('../models/question')

class questionController {
    static find(req, res, next) {
        Question.find().populate('userId')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Question.findById(req.params.id).populate('userId')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static create(req, res, next) {
        let { id } = req.decode
        let {title, content} = req.body
        Question.create({
            title,
            content,
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
        let updatedData = {}
        req.body.title && (updatedData.title = req.body.title)
        req.body.content && (updatedData.content = req.body.content)
        Question.findByIdAndUpdate(id, updatedData, {new: true, runValidators: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Question.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(200).json({message: 'Question deleted'})
        })
        .catch(next)
    }

    static upvote(req, res, next) {
        let { id } = req.params
        let userId = req.decode.id
        Question.findById(id)
        .then(question => {
            console.log(question)
            let check = true
            for(let i = 0; i < question.upVote.length; i++) {
                if (question.upVote[i] == userId) {
                    check = false
                }
            }
            for (let j = 0; j < question.downVote.length; j++) {
                if (question.downVote[j] == userId) {
                    check = false
                    Question.findByIdAndUpdate(id, {$pull: {downVote: userId}}, {new: true, runValidators: true})
                    .then(result => {
                        res.status(200).json({message: 'removed down vote'})
                    })
                    .catch(next)
                }
            }

            if(check) {
                Question.findByIdAndUpdate(id, {$push: {upVote: userId}}, {new: true, runValidators: true})
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
        Question.findById(id)
        .then(question => {
            let check = true
            for(let i = 0; i < question.downVote.length; i++) {
                if (question.downVote[i] == userId) {
                    check = false
                }
            }
            for (let j = 0; j < question.upVote.length; j++) {
                if (question.upVote[j] == userId) {
                    check = false
                    Question.findByIdAndUpdate(id, {$pull: {upVote: userId}}, {new: true, runValidators: true})
                    .then(result => {
                        res.status(200).json({message: 'removed up vote'})
                    })
                    .catch(next)
                }
            }

            if(check) {
                Question.findByIdAndUpdate(id, {$push: {downVote: userId}}, {new: true, runValidators: true})
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

module.exports = questionController