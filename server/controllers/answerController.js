const Answer = require('../models/answer');
const Question = require('../models/question');
const { ObjectId } = require('mongoose').Types;

class AnswerController {
    static create(req, res, next) {
        Answer
            .create({
                content: req.body.content,
                owner: req.authenticatedUser._id
            })
            .then(newAnswer => {
                return Question.updateOne({
                    _id: req.params.questionId
                }, {
                        $push: {
                            answers: newAnswer._id
                        }
                    })
            })
            .then(result => {
                res.status(200).json(result)
                // res.status(201).json(newAnswer)
            })
            .catch(err => {
                next(err);        
            })
    }

    static update(req, res, next) {
        Answer
            .updateOne({
                _id: req.params.id
            }, {
                    $set: req.body
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Answer not found'
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static upvote(req, res, next) {
        let token = req.authenticatedUser
        Answer.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(token._id)
                let checkDownvotes = data.downvotes.includes(token._id)

                if (checkUpvotes) {
                   Answer.findByIdAndUpdate(id,
                        {$pull:
                            {upvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (!checkUpvotes && checkDownvotes) {
                    Answer.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {downvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        Answer.findByIdAndUpdate(req.params.id,
                            {$push:
                                {upvotes: token._id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json( { data: updated } )
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Answer.findByIdAndUpdate(req.params.id,
                        {$push:
                            {upvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                }
            }
        })
        .catch(next)
    }

    static downvote(req, res, next) {
        let token = req.authenticatedUser
        Answer.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(token._id)
                let checkDownvotes = data.downvotes.includes(token._id)

                if (checkDownvotes) {
                    Answer.findByIdAndUpdate(id,
                        {$pull:
                            {downvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (checkUpvotes && !checkDownvotes) {
                    Answer.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {upvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Answer.findByIdAndUpdate(req.params.id,
                            {$push:
                                {downvotes: token._id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json( { data: updated } )
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Answer.findByIdAndUpdate(req.params.id,
                        {$push:
                            {downvotes: token._id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                }
            }
        })
        .catch(next)
    }

    static getAll(req, res, next) {
        Answer
            .find({
                owner: req.authenticatedUser._id
            })
            .sort({ created_at: -1 })
            .then(questions => {
                res
                    .status(200)
                    .json(questions)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOne(req, res, next) {
        Answer
            .findOne({
                _id: req.params.id
            })
            .populate('upvotes')
            .populate('downvotes')
            // .populate('comments.userId')
            .then(questions => {
                res
                    .status(200)
                    .json(questions)
            })
            .catch(err => {
                next(err)
            })
    }

    static comment(req, res, next) {
        const obj = {
            content: req.body.content,
            userId: ObjectId(req.authenticatedUser._id)
        }
        Answer
            .updateOne({
                _id: req.params.id
            }, {
                    $push: {
                        comments: obj
                    }
                })
            .then(result => {
                if (result.n && result.ok) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({
                        message: 'Answer not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteOne(req, res, next) {
        Promise
            .all([
                Answer
                    .deleteOne({
                        _id: req.params.id
                    }),
                Question
                    .updateOne({
                        _id: req.params.questionId
                    }, {
                        $pull: {
                            answers: ObjectId(req.params.id)
                        }
                    })
            ])
            .then(([result1, result2]) => {
                if (result1.n && result1.ok) {
                    res
                        .status(200)
                        .json(result1)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Answer not found'
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = AnswerController;
