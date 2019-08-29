const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
    authQuestions(req, res, next){
        Question.findById(req.params.questionId).populate('author')
            .then( data => {
                if(data){
                    if(data.author._id == req.decoded._id){
                        next()
                    } else {
                        next({ code: 401, message: 'Not authorized'})
                    }
                } else {
                    next({ code: 401, message: 'Not authorized'})
                }
            })
            .catch(next)
    },
    authAnswers(req, res, next){
        Answer.findById(req.params.answerId)
            .then( data => {
                if(data){
                    if(data.author._id == req.decoded._id){
                        next()
                    } else {
                        next({ code: 401, message: 'Not authorized'})
                    }
                } else {
                    next({ code: 401, message: 'Not authorized'})
                }
            })
            .catch(next)
    },
}