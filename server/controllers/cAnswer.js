const Answer = require('../models/mAnswer')
const Question = require('../models/mQuestion')

class AnswerController {
    static create(req,res,next){
        const userId = req.decode.id
        const { id } = req.params
        const { description } = req.body
        let answer = {}
        Answer.create({description, question: id, owner: userId})
        .then(data => {
            Answer.populate(data, {path: 'owner'}, function(err,newData){
                if (err) next(err)
            })
            answer = data;
            return Question.findByIdAndUpdate(id, {$push: {answer: data._id}}, {new: true})
        })
        .then(data => {

            res.status(201).json(answer)
        })  
        .catch(next)
    }

    static deleteAnswer(req,res,next){
        const userId = req.decode.id
        const { id } = req.params
        Answer.findByIdAndDelete(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static update(req,res,next){
        const { id } = req.params
        const { description } = req.body
        Answer.findByIdAndUpdate(id,{description},{new: true}).populate('owner')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }


    static votes(req,res,next){
        const { id } = req.params
        const idUser = req.decode.id
        let { votetype } = req.body
        let check = false;
        let checkVote = null;
        if (votetype == "upvotes" ){
            checkVote = 'downvotes'
        } else {
            checkVote = 'upvotes'
        }
        Answer.findById(id)
            .then(data => {
                for (let i=0; i<data[checkVote].length; i++){
                    if (data[checkVote][i] == idUser){
                        check = true;
                    }
                }
                for (let i=0; i<data[votetype].length; i++){
                    if (data[votetype][i] == idUser){
                        let temp = checkVote;
                        checkVote = votetype
                        votetype = temp
                        check = true;
                    }
                }
                return AnswerController.checkVotes(check, votetype, checkVote,idUser,id)
            })
            .then(newData => {
                res.status(200).json(newData)
            })
            .catch(next)
    }

    static checkVotes(check, votetype,checkvote, idUser,id){
        if (check){
            return Answer.findByIdAndUpdate(id,{$pull : {[checkvote]: idUser}}, {new : true})
        } else {
            return Answer.findByIdAndUpdate(id,{$push : {[votetype]: idUser}}, {new : true})
        }
    }
}

module.exports = AnswerController