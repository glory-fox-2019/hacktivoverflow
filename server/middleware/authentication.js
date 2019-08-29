const { verifyToken } = require('../helper/jwt');
const Question = require('../model/question');
const { ObjectId } = require('mongodb');

module.exports = {
    Authentication: (req, res, next) => {
        if (req.headers.token) {
            try {
                let decode = verifyToken(req.headers.token)
                req.decode = decode
                next()
            }
            catch{
                throw new Error({ status: 401, message: "invalid token", err: err })
            }
        }
        else {
            throw new Error({ status: 401, message: "please login first" })
        }
    }
    ,
    Authorization: (req, res, next) => {
        const _id = req.params.id;
        const user = req.decode;
        Question.findById({
            _id
        })
            .populate('UserId')
            .then(function (question) {
                if (question.UserId._id == user._id) {
                    next()
                } else {
                    next({ status: 401, message: "Unauthorized action!" })
                }
            })
            .catch(next)
    }
}