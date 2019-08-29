const User        = require('../models/user');
const Question    = require('../models/question');
const Answer      = require('../models/answer');
const { verifyJWT }  = require('../helpers/helper');

module.exports = {
    authentication: function (req, res, next) {
        try {
            const token = req.headers.access_token
            if (token) {
                const decoded = verifyJWT(req.headers.access_token)
                req.authenticatedUser = decoded
                next()
            } else {
                res
                    .status(401)
                    .json({
                        message: 'Please login to continue'
                    })
            }
        } catch (err) {
            res
                .status(401)
                .json({
                    message: 'Please login to continue'
                })
        }
    },

    questionAuthorization: function (req, res, next) {
        Question
            .findById(req.params.id)
            .then(question => {
                if (question) {
                    if (String(question.owner) !== req.authenticatedUser._id) {
                        res
                            .status(403)
                            .json({
                                message: 'Forbidden'
                            })
                    } else {
                        next()
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Question not found'
                        })
                }
            })
            .catch(err => {
                next(err);
            })
    },

    answerAuthorization: function (req, res, next) {
        Answer
            .findById(req.params.id)
            .then(answer => {
                if (answer) {
                    if (String(answer.owner) !== req.authenticatedUser._id) {
                        res
                            .status(403)
                            .json({
                                message: 'Forbidden'
                            })
                    } else {
                        next()
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Answer not found'
                        })
                }
            })
            .catch(err => {
                next(err);
            })
    }
}
