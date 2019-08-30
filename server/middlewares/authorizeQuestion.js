module.exports = (req, res, next) => {
    const Question = require('../models/question')
    const { id } = req.decode
    const questionId = req.params.id
    Question.findById(questionId)
    .then(data => {
        if(data.userId == id){
            next()
        }
    })
    .catch(next)
}