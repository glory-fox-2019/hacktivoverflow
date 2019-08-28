const Question = require('../models/question')
const { ObjectId } = require('mongoose').Types

class QuestionContoller {
    static create(req, res, next) {
        if (req.body.tags.length > 0) {
            req.body.tags = req.body.tags.map(tag => tag.replace(/ /g,''))
        }

        const { title, content, tags } = req.body
        Question.create({
                title,
                content,
                tags,
                owner: req.authenticatedUser._id
        })
        .then(newQuestion => {
            res.status(201).json(newQuestion)
        })
        .catch(err => {
            if (RegExp('validation').test(err.message)) {
                next({
                    code: 403,
                    message: err.message
                })
            }
            else {
                next(err)
            }
        })
    }

    static update(req, res, next) {
        if (req.body.tags && req.body.tags.length > 0) {
            req.body.tags = req.body.tags.map(tag => tag.replace(/ /g,''))
        }

        Question.updateOne({
            _id: req.params.id
        }, {
            $set: req.body
        })
        .then(result => {
            if (result.n && result.ok) {
                res.status(200).json(result)
            }
            else {
                next({
                    code: 404,
                    message: `Question not found`
                })
            }
        })
        .catch(next)
    }

    static upvote(req, res, next) {
        Question.updateOne({
            _id: req.params.id
        }, {
            $addToSet: {
                upvotes: ObjectId(req.authenticatedUser._id)
            },
            $pull: {
                downvotes: ObjectId(req.authenticatedUser._id)
            }
        })
        .then(result => {
            if (result.n && result.ok) {
                res.status(200).json(result)
            }
            else {
                next({
                    code: 404,
                    message: `Question not found`
                })
            }
        })
        .catch(next)
    }

    static downvote(req, res, next) {
        Question.updateOne({
            _id: req.params.id
        }, {
            $addToSet: {
                downvotes: ObjectId(req.authenticatedUser._id)
            },
            $pull: {
                upvotes: ObjectId(req.authenticatedUser._id)
            }
        })
        .then(result => {
            if (result.n && result.ok) {
                res.status(200).json(result)
            }
            else {
                next({
                    code: 404,
                    message: `Question is not found`
                })
            }
        })
        .catch(next)
    }

    static getAll(req, res, next) {
        let field = {}
        
        if (req.query.title) {
            field.title = {
                $regex: req.query.title,
                $options: 'i'
            }
        }
        else if (req.query.tags) {
            field.tags = {
                $in: req.query.tags
            }
        }
        Question.find(field)
        .populate('owner')
        .sort({ created_at: -1 })
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static questionDetail(req, res, next) {
        Question.findOne({
            _id: req.params.id
        })
        .populate('owner')
        .populate({
            path: 'upvotes',
            populate: {
                path: 'owner'
            }
        })
        .populate({
            path: 'downvotes',
            populate: {
                path: 'owner'
            }
        })
        .populate({
            path: 'answers',
            populate: {
                path: 'upvotes'
            }
        })
        .populate({
            path: 'answers',
            populate: {
                path: 'downvotes'
            }
        })
        .populate({
            path: 'answers',
            populate: {
                path: 'owner'
            }
        })
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static comment(req, res, next) {
        const obj = {
            content: req.body.content,
            userId: ObjectId(req.authenticatedUser._id)
        }
        Question.updateOne({
            _id: req.params.id
        }, {
            $push: {
                comments: obj
            }
        })
        .then(result => {
            if (result.n && result.ok) {
                res.status(200).json(result)
            }
            else {
                next({
                    code: 404,
                    message: `Question not found`
                })
            }
        })
        .catch(next)
    }

    static deleteOne(req, res, next) {
        Question.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            if (result.n && result.ok) {
                res.status(200).json(result)
            }
            else {
                next({
                    code: 404,
                    message: `Question not found`
                })
            }
        })
        .catch(next)
    }
}

module.exports = QuestionContoller
