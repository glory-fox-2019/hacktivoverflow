const User        = require('../models/user')
const Question    = require('../models/question')
const Answer      = require('../models/answer')
const { decode }  = require('../helpers')

module.exports = {
    authentication: function (req, res, next) {
        try {
            const decoded  = decode(req.headers.accesstoken)
            req.authenticatedUser = decoded
            User.findById(decoded._id)
            .then(user => {
                if (user) {
                    next()
                }
                else {
                    next({
                        message : `User is not found`,
                        code : 401
                    })
                }
            })
            .catch(next)
        }
        catch (err) {
            next({
                code : 401,
                message: 'Please login to continue'
            })
        }
    },

    questionAuthorization: function (req, res, next) {
        Question.findById(req.params.id)
        .then(question => {
            if (question) {
                if (String(question.owner) !== req.authenticatedUser._id) {
                    next({
                        code: 403,
                        message: 'Forbidden'
                    })
                }
                else {
                    next()
                }
            }
            else {
                next({
                    code: 404,
                    message: `Question is not found`
                })
            }
        })
        .catch(next)
    },

    answerAuthorization: function (req, res, next) {
        Answer.findById(req.params.id)
        .then(answer => {
            if (answer) {
                if (String(answer.owner) !== req.authenticatedUser._id) {
                    next({
                        code: 403,
                        message: 'Forbidden'
                    })
                }
                else {
                    next()
                }
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
}
