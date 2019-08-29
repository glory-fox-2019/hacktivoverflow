const { answer ,  question } = require('../model')

class answer_controller {
    static createAnswer (req,res,next){
        let {  question2 , title , description } = req.body
        let answerTemp;
        answer.create({
            title , description , question : question2 , User : req.decode.data
        })
        .then(data=>{
            answerTemp = data
            return question.findOne({
                _id : question2._id
            })
            
        })
        .then(q=>{
            console.log(q)
            q.Answer.push(answerTemp);
            q.save();
            res.status(201).json(answerTemp)
        })
        .catch(next)
    }

    static getAnswer (req,res,next) {
        answer.find({
            question : req.params.id
        }).populate('User')
        .then(data=>{
            res.json(data)
        })
        .catch(next)
    }
    
    static updateAnswer (req, res, next) {
        let {  title , description   } = req.body
        answer.updateOne({
            _id : req.params.id ,  User : req.decode.data
        },{
            title , description
        })
        .then(data=>{
            res.json(data)
        })
        .catch(next)
    }
}

module.exports = answer_controller