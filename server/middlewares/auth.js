const jwtoken = require('../helpers/jwt')
const Answer = require('../models/answer')
const Question = require('../models/question')

module.exports = {
    authentication(req, res, next) {
        try {
            var decoded = jwtoken.verifyToken(req.headers.token)
            req.headers.decode = decoded
            next()
        } catch (err) {
            next({
                code: 401,
                message: 'Unauthorized process'
            })
        }
    },
    authorAnswer(req, res, next) {
        Answer.findById(req.params.answerId)
            .then(answer => {
                if (answer.userId == req.headers.decode.id) {
                    next()
                } else {
                    next({
                        code: 401,
                        message: 'Unauthorized process'
                    })
                }
            })
            .catch(next)
    },
    authorQuestion(req, res, next) {
        Question.findById(req.params.questionId)
            .then(question => {
                if (question.userId == req.headers.decode.id) {
                    next()
                } else {
                    next({
                        code: 401,
                        message: 'Unauthorized process'
                    })
                }
            })
            .catch(next)
    }
}