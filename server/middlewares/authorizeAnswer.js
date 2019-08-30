module.exports = (req, res, next) => {
    const Answer = require('../models/answer')
    const { id } = req.decode
    const answerId = req.params.id
    Answer.findById(answerId)
    .then(data => {
        if(data.userId == id){
            next()
        }
    })
    .catch(next)
}