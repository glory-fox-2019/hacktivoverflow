const Question = require('../models/question')

module.exports = (req, res, next) => {
    Question.findOne({
        _id: req.params.id
    })
    .then(question => {
        if (question) {
            if (question.user == req.decode.id) {
                next()
            }
            else {
                res.status(401).json("You are not authorized user")
            }
        }
        else {
            throw {
                status: 404,
                message: "Question not found"
            }
        }
    })
    .catch(next)
}