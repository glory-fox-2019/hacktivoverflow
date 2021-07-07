const Answer = require('../models/answer')
const Question = require('../models/question')
const User = require('../models/user')

class AnswerController {

    static makeAnswer(req, res, next) {
        Answer.create({
                content: req.body.content,
                userId: req.headers.decode.id,
                questionId: req.params.questionId
            })
            .then(answer => {
                return Promise.all([answer, Question.updateOne({
                    _id: answer.questionId
                }, {
                    $push: {
                        answers: answer._id
                    }
                })])
            })
            .then(([answer]) => {
                res.status(201).json(answer)
            })
            .catch(next)
    }

    static findAnswer(req, res, next) {
        Answer.find({
                questionId: req.params.questionId
            })
            .populate('userId')
            .populate('questionId')
            .then(answer => {
                console.log(answer)
                res.status(200).json(answer)
            })
            .catch(next)
    }

    static findOneAnswer(req, res, next) {
        Answer.findById(req.params.answerId)
            .populate('userId')
            .populate('questionId')
            .then(answer => {
                console.log(answer)
                res.status(200).json(answer)
            })
            .catch(next)
    }

    static updateAnswer(req, res, next) {
        let update = {}
        req.body.content && (update.content = req.body.content)

        Answer.updateOne({
                _id: req.params.answerId
            }, {
                $set: {
                    content: req.body.content
                }
            })
            .then(updatedRow => {
                res.status(200).json('Successfully update answer.')
            })
            .catch(next)
    }

    static deleteAnswer(req, res, next) {
        Answer.deleteOne({
                _id: req.params.answerId
            })
            .then(deletedRow => {
                return Question.findOneAndUpdate({
                    _id: req.params.questionId
                }, {
                    $pull: {
                        answers: req.params.answerId
                    }
                })
            })
            .then(deletedDoc => {
                return User.updateMany({}, {
                    $pull: {
                        upvotedAnswer: req.params.answerId,
                        downvotedAnswer: req.params.answerId
                    }
                })
            })
            .then(numUpdated => {
                res.status(200).json("Successfuly deleted answer")
            })
            .catch(next)
    }

    // =======================================   belom di update
    static upVote(req, res, next) {
        User.findById(req.headers.decode.id)
            .then(user => {
                // console.log(user)
                let upvotedAnswers = user.upvotedAnswer
                let check = upvotedAnswers.find(answerId => answerId == req.params.answerId)
                if (check) {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                            $pull: {
                                upvotedAnswer: req.params.answerId
                            }
                        }),
                        Answer.updateOne({
                            _id: req.params.answerId
                        }, {
                            $pull: {
                                upVotes: req.headers.decode.id
                            }
                        })
                    ])
                } else {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                            $push: {
                                upvotedAnswer: req.params.answerId
                            },
                            $pull: {
                                downvotedAnswer: req.params.answerId
                            }
                        }),
                        Answer.updateOne({
                            _id: req.params.answerId
                        }, {
                            $push: {
                                upVotes: req.headers.decode.id
                            },
                            $pull: {
                                downVotes: req.headers.decode.id
                            }
                        })
                    ])
                }
            })
            .then(([oldUser]) => {
                res.status(200).json('Successfuly upvoted')
            })
            .catch(next)
    }

    static downVote(req, res, next) {
        User.findById(req.headers.decode.id)
            .then(user => {
                // console.log(user)
                let downvotedAnswers = user.downvotedAnswer
                let check = downvotedAnswers.find(answerId => answerId == req.params.answerId)
                if (check) {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                            $pull: {
                                downvotedAnswer: req.params.answerId
                            }
                        }),
                        Answer.updateOne({
                            _id: req.params.answerId
                        }, {
                            $pull: {
                                downVotes: req.headers.decode.id
                            }
                        })
                    ])
                } else {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                            $push: {
                                downvotedAnswer: req.params.answerId
                            },
                            $pull: {
                                upvotedAnswer: req.params.answerId
                            }
                        }),
                        Answer.updateOne({
                            _id: req.params.answerId
                        }, {
                            $push: {
                                downVotes: req.headers.decode.id
                            },
                            $pull: {
                                upVotes: req.headers.decode.id
                            }
                        })
                    ])
                }
            })
            .then(([oldUser]) => {
                res.status(200).json('Successfuly downvote answer')
            })
            .catch(next)
    }
}

module.exports = AnswerController