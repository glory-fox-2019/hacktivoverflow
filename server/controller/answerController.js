const Answer = require('../model/answer');
const Question = require('../model/question');
const { ObjectId } = require('mongodb');

class AnswerController {

    static create(req, res, next) {
        const UserId = req.decode._id;
        const _id = req.params.id;
        const { answer } = req.body;
        let data = {
            answer,
            UserId,
            downvotes: [],
            upvotes: []
        }
        Answer.create(data)
            .then(function (answer) {
                return Question.findByIdAndUpdate(
                    { _id },
                    { $push: { answers: ObjectId(answer._id) } }, {
                        new: true
                    }
                );
            })
            .then(function (question) {
                res.status(201).json(question);
            })
            .catch(next)
    }

    static readOne(req, res, next) {
        const _id = req.params.id;
        Answer.findById({
            _id
        })
            .populate('UserId')
            .then(function (answer) {
                res.status(200).json(answer);
            })
            .catch(next)
    }

    static vote(req, res, next) {
        const UserId = req.decode._id
        const _id = req.params.id
        const { value } = req.body
        let data = {

        }
        Answer.findById({
            _id
        })
            .then((answer) => {
                console.log(answer);
                let canVote = true;
                // console.log(answer);
                const checkDown = answer.downvotes.filter((user) => {
                    console.log(user);
                    // console.log((userId));
                    if (user === UserId) {
                        canVote = false;
                        return user
                    }
                })
                const checkUp = answer.upvotes.filter((user) => {
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
                        Answer.findByIdAndUpdate(
                            { _id },
                            { $push: { upvotes: UserId } }, {
                                new: true
                            }
                        )
                            .then(answer => {
                                res.status(200).json(answer);
                            })
                    } else if (value === '1') {
                        Answer.findByIdAndUpdate(
                            { _id },
                            { $push: { downvotes: UserId } }, {
                                new: true
                            }
                        )
                            .then(answer => {
                                res.status(200).json(answer);
                            })
                    }
                } else {
                    console.log(checkDown);
                    console.log(checkUp);
                    console.log(canVote);
                    if (checkUp.length === 1 && value === '1') {
                        Answer.findByIdAndUpdate(
                            { _id },
                            { $pull: { upvotes: UserId } }, {
                                new: true
                            }
                        )
                            .then(answer => {
                                res.status(200).json(answer);
                            })
                    } else if (checkDown.length === 1 && value === '0') {
                        Answer.findByIdAndUpdate(
                            { _id },
                            { $pull: { downvotes: UserId } }, {
                                new: true
                            }
                        )
                            .then(answer => {
                                res.status(200).json(answer);
                            })
                    } else {
                        res.status(200).json(answer);
                    }
                }
            })
            .catch(next)
    }

}

module.exports = AnswerController;