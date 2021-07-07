const Question = require('../models/question')
const Answer = require('../models/answer')
const User = require('../models/user')
const Tag = require('../models/tag')

class QuestionController {

    static async makeQuestion(req, res, next) {
        try {
            // ======================== check tags in database
            let tags = req.body.tags
            let tagsId = []
            for (const tag of tags) {
                let findTag = await Tag.findOne({ name: tag })

                if (findTag) {
                    let currentCount = findTag.count
                    await Tag.updateOne({ _id: findTag._id }, { $set: { count: currentCount + 1 } })
                    tagsId.push(findTag._id)
                } else {
                    let newTag = await Tag.create({
                        name: tag,
                        count: 1
                    })
                    tagsId.push(newTag._id)
                }
            }

            // ========================= create new question
            let newQuestion =
                await Question.create({
                    title: req.body.title,
                    content: req.body.content,
                    userId: req.headers.decode.id,
                    upVotes: [],
                    downVotes: [],
                    tags: tagsId
                })

            res.status(201).json(newQuestion)
        } catch (error) {
            next(error)
        }
    }

    static getAllQuestion(req, res, next) {
        Question.find()
            .populate('answers')
            .populate('userId')
            .populate('tags')
            .sort({ createdAt: -1 })
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)

    }

    static findQuestion(req, res, next) {
        Question.findById(req.params.questionId)
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId'
                }
            })
            .populate('tags')
            .populate('userId')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static async updateQuestion(req, res, next) {
        try {
            let incomingTags = req.body.tags
            let incomingTagsId = []

            // create new tag if new tag found, increase count if already exist
            for (const tag of incomingTags) {
                let findTag = await Tag.findOne({ name: tag })
                if (findTag) {
                    let currentCount = findTag.count
                    await Tag.updateOne({ _id: findTag._id }, { $set: { count: currentCount + 1 } })
                    incomingTagsId.push(findTag._id)
                } else {
                    let newTag = await Tag.create({ name: tag, count: 1 })
                    incomingTagsId.push(newTag._id)
                }
            }

            // check if tags input is 0 or more than 4
            if (incomingTagsId.length == 0) {
                next({
                    code: 400,
                    message: 'Please input at least one tag.'
                })
            } else if (incomingTagsId.length >= 5) {
                next({
                    code: 400,
                    message: 'Maximum tags input is 4.'
                })
            }

            // decrease count if any previous tags deleted by comparing old vs new Tags
            let willUpdated = await Question.findById(req.params.questionId)
            let previousTagsId = willUpdated.tags
            for (const oldTag of previousTagsId) {
                let check = incomingTagsId.includes(oldTag)
                if (!check) {
                    let findTag = await Tag.findById(oldTag)
                    await Tag.updateOne({ _id: findTag._id }, { $set: { count: findTag.count - 1 } })
                }
            }

            // update the question
            let update = {}
            req.body.title && (update.title = req.body.title)
            req.body.content && (update.content = req.body.content)
            req.body.tags && (update.tags = incomingTagsId)

            let updatedQuestion = await Question.updateOne({ _id: req.params.questionId }, { $set: update })

            res.status(200).json(updatedQuestion)
        } catch (error) {
            next(error)
        }

    }

    static async deleteQuestion(req, res, next) {

        try {
            let deletedQuestion = await Question.findOneAndDelete({ _id: req.params.questionId })
            let deletedQuestionTags = deletedQuestion.tags

            await Answer.deleteMany({ questionId: req.params.questionId })

            // pulling upvoted & downvoted question from user
            await User.updateMany({}, { $pull: { upvotedQuestion: req.params.questionId, downvotedQuestion: req.params.questionId } })

            //pulling upvoted & downvoted related answer from user
            for (let answer of deletedQuestion.answers) {
                await User.updateMany({}, {
                    $pull: {
                        upvotedAnswer: answer,
                        downvotedAnswer: answer
                    }
                })
            }

            // decrease all realated tag
            for (const tagId of deletedQuestionTags) {
                let findTag = await Tag.findById(tagId)
                await Tag.updateOne({ _id: tagId }, { $set: { count: findTag.count - 1 } })
            }

            res.status(200).json(deletedQuestion)
        } catch (error) {
            next(error)
        }

    }

    static upVote(req, res, next) {
        User.findById(req.headers.decode.id)
            .then(user => {
                let upvotedQuestions = user.upvotedQuestion
                let check = upvotedQuestions.find(questionId => questionId == req.params.questionId)
                if (check) {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                                $pull: {
                                    upvotedQuestion: req.params.questionId
                                }
                            }),
                        Question.updateOne({
                            _id: req.params.questionId
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
                                    upvotedQuestion: req.params.questionId
                                },
                                $pull: {
                                    downvotedQuestion: req.params.questionId
                                }

                            }),
                        Question.updateOne({
                            _id: req.params.questionId
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
                let downvotedQuestions = user.downvotedQuestion
                let check = downvotedQuestions.find(questionId => questionId == req.params.questionId)
                if (check) {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                                $pull: {
                                    downvotedQuestion: req.params.questionId
                                }
                            }),
                        Question.updateOne({
                            _id: req.params.questionId
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
                                    downvotedQuestion: req.params.questionId
                                },
                                $pull: {
                                    upvotedQuestion: req.params.questionId
                                }
                            }),
                        Question.updateOne({
                            _id: req.params.questionId
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
                res.status(200).json('Successfuly downvoted')
            })
            .catch(next)
    }

}

module.exports = QuestionController