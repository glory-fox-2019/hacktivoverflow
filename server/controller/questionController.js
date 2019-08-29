const Question = require('../model/question');
const Answer = require('../model/answer');
const { ObjectId } = require('mongodb');

class QuestionController {

    static create(req, res, next) {
        const { title, description } = req.body;
        const UserId = ObjectId(req.decode._id);
        let data = {
            UserId,
            title,
            description,
            downvotes: [],
            upvotes: [],
            answers: []
        };
        Question.create(data)
            .then(function (question) {
                res.status(201).json(question);
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        Question.find({}, null, { sort: { createdAt: -1 } })
            .populate('UserId')
            .populate('answers')
            .then(function (questions) {
                res.status(200).json(questions);
            })
            .catch(next)
    }

    static readOne(req, res, next) {
        const _id = req.params.id;
        Question.findById({
            _id
        })
            .populate('UserId')
            .populate('answers')
            // .populate({ path: 'answers', select: 'UserId' })
            .then(function (question) {
                res.status(200).json(question);
            })
            .catch(next)
    }

    static edit(req, res, next) {
        let data = {};
        req.body.title && (data.title = req.body.title);
        req.body.description && (data.description = req.body.description);
        const _id = req.params.id;
        Question.findByIdAndUpdate({
            _id
        }, data, {
                new: true
            })
            .then(function (question) {
                res.status(200).json(question);
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        Question.findById({
            _id
        })
            .then((question) => {
                return question.answers.forEach(answer => {
                    Answer.findByIdAndDelete({
                        _id: ObjectId(answer._id)
                    });
                });
                // Promise.all(deleteAnswer);
            })
            .then(() => {
                return Question.findByIdAndDelete({
                    _id
                })
            })
            .then(() => {
                res.status(200).json({
                    message: `Success delete question`
                })
            })
            .catch(next)
    }

    static vote(req, res, next) {
        const UserId = req.decode._id
        const _id = req.params.id
        const { value } = req.body
        let data = {

        }
        Question.findById({
            _id
        })
            .then((question) => {
                console.log(question);
                let canVote = true;
                // console.log(question);
                const checkDown = question.downvotes.filter((user) => {
                    console.log(user);
                    // console.log((userId));
                    if (user === UserId) {
                        canVote = false;
                        return user
                    }
                })
                const checkUp = question.upvotes.filter((user) => {
                    console.log(user);
                    // console.log((userId));
                    if (user === UserId) {
                        canVote = false
                        return user
                    }
                })
                if (canVote) {
                    console.log(value);
                    if (value === '0') {
                        Question.findByIdAndUpdate(
                            { _id },
                            { $push: { upvotes: UserId } }, {
                                new: true
                            }
                        )
                            .then(question => {
                                res.status(200).json(question);
                            })
                    } else if (value === '1') {
                        Question.findByIdAndUpdate(
                            { _id },
                            { $push: { downvotes: UserId } }, {
                                new: true
                            }
                        )
                            .then(question => {
                                res.status(200).json(question);
                            })
                    }
                } else {
                    if (checkUp.length === 1 && value === '1') {
                        Question.findByIdAndUpdate(
                            { _id },
                            { $pull: { upvotes: UserId } }, {
                                new: true
                            }
                        )
                            .then(question => {
                                res.status(200).json(question);
                            })
                    } else if (checkDown.length === 1 && value === '0') {
                        Question.findByIdAndUpdate(
                            { _id },
                            { $pull: { downvotes: UserId } }, {
                                new: true
                            }
                        )
                            .then(question => {
                                res.status(200).json(question);
                            })
                    } else {
                        res.status(200).json(question);
                    }
                }
            })
            .catch(next)
    }

}

module.exports = QuestionController;