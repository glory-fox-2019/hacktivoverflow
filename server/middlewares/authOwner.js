const Question = require('../models/mQuestion');

module.exports = (req,res,next) => {
    const { id } = req.params   
    const owner = req.decode.id
    Question.findById(id)
        .then(data => {
            if (data.owner == owner){
                next()
            } else {
                let err = {};
                err.message = 'Your Action fail!';
                err.statusCode = 401
            }
        })
        .catch(next)
}