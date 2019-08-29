const jwt = require('../helpers/jwt')
const Answer = require('../models/Answer')
const Question = require('../models/Question')

function authentication(req,res,next){
    try {
        let decoded = jwt.verifyToken(req.headers.token);
        req.decoded = decoded
        next()
      } catch(err) {
        next(err)
      }
}

function authorization(req,res,next){
    Question.findById(req.params.id)
        .then(ques=>{
            if(ques){
                if(ques.User == req.decoded._id){
                    next()
                }else{
                    res.status(401).json({message : 'Unauthorized user'})
                }
            }else{
                res.status(404).json({message: 'Question is not found'})
            }
        })
        .catch(err=>{
            next(err)
        })

}

function authorizationAnswer(req,res,next){
    Answer.findById(req.params.id)
        .then(answer=>{
            if(answer){
                if(answer.User == req.decoded._id){
                    next()
                }else{
                    res.status(401).json({message : 'Unauthorized user'})
                }
            }else{
                res.status(404).json({message: 'Answer is not found'})
            }
        })
        .catch(err=>{
            next(err)
        })

}
module.exports = {
    authentication,
    authorization,
    authorizationAnswer
}