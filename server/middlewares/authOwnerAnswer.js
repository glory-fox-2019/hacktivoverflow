const Answer = require('../models/mAnswer')

module.exports = (req,res,next) => {
    const userId = req.decode.id
    const { id } = req.params
    Answer.findById(id)
    .then(data => {
        if (data) {
            if (data.owner == userId){
                next()
            } else {
                let err = {
                    statusCode : 401,
                    message : 'Your action is fail'
                }
            }
        } else {
            let err = {
                statusCode : 404,
                message : "Not Found"
            }
            next(err)
        }
    })
}