const Question = require('../models/question')
const Top = require('../models/top')

class questionController {
    static find(req, res, next) {
        Question.find().populate('userId').sort({createdAt: -1})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Question.findById(req.params.id).populate('userId')
        .then(result => {
            console.log(result)
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
            let check = true
            for(let i = 0; i < question.upVote.length; i++) {
                if (question.upVote[i] == userId) {
                    check = false
                    res.status(200).json({message: 'already upvote'})
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
                    res.status(200).json({message: 'already downvote'})
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
            }
        })
        .catch(next)
    }

    static topThree(req, res, next) {
        let arr = []
        Question.find().populate('userId')
        .then(results => {
            for(let i = 0; i < results.length; i++) {
                let top = {}
                top.title = results[i].title
                top.vote = results[i].upVote.length - results[i].downVote.length
                top.name = results[i].userId.name
                arr.push(top)
            }
            arr.sort(function(a,b) {
                return b.vote - a.vote
            })
            let newArr = arr.slice(0,3)
            let topId = '5d67a27633baa134a0f5b721'
            Top.findByIdAndUpdate(topId, {$set: {topThree: []}}, {new: true, runValidators: true})
            .then(tops => {
                Top.findByIdAndUpdate(topId, {$push:{topThree: newArr}}, {new: true, runValidators: true})
                .then(data => {
                    res.status(200).json(data)
                })
            })
            .catch(next)
        })
        .catch(next)
    }

}

module.exports = questionController