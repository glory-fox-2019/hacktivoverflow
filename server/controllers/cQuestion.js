const Question = require('../models/mQuestion')
const Answer = require('../models/mAnswer')

class QuestionController {
    static create(req,res,next){
        const { title, description } = req.body
        const { id } = req.decode
        Question.create({title, description, owner: id})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static myCollection(req,res,next){
        const owner = req.decode
        Question.find(owner)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static getAll(req,res,next){
        Question.find().populate('owner')
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                let err = {
                    statusCode : 404,
                    message : 'Not Found'
                };
                next(err)
            }
        })
        .catch(next)
    }
    
    static getById(req,res,next){
        const {id} = req.params;
        Question.findById(id).populate('upvotes').populate('owner').populate('downvotes').populate({
            path: 'answer',
            populate:{
                path: 'owner'
            }
        })
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                let err = {
                    statusCode : 404,
                    message : 'Not Found'
                };
                next(err)
            }
        })
        .catch(next)
    }

    static delete(req,res,next){
        const { id } = req.params
        Question.findByIdAndDelete(id)
            .then(data => {
                res.status(200).json({message: 'Successfully deleted!'})
            })
            .catch(next)
    }

    static update(req,res,next){
        const { id } = req.params
        const input = {};
        req.body.title  && (input.title = req.body.title)
        req.body.description && (input.description = req.body.description)
        Question.findByIdAndUpdate(id , input, {new: true})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static votes(req,res,next){
        const { id } = req.params
        const idUser = req.decode.id
        const { votetype } = req.body
        let check = false;
        let checkVote = null;
        if (votetype == "upvotes" ){
            checkVote = 'downvotes'
        } else {
            checkVote = 'upvotes'
        }
        Question.findById(id)
            .then(data => {
                for (let i=0; i<data[votetype].length; i++){
                    if (data[votetype][i] == idUser){
                        res.status(200).json({message: 'Cant doing this again'})
                        return
                    }
                }
                for (let i=0; i<data[checkVote].length; i++){
                    if (data[checkVote][i] == idUser){
                        console.log('true')
                        check = true;
                    }
                }
                
                return QuestionController.checkVotes(check, votetype, checkVote,idUser,id)
            })
            .then(newData => {
                res.status(200).json(newData)
            })
            .catch(next)
    }

    static checkVotes(check, votetype,checkvote, idUser,id){
        if (check){
            return Question.findByIdAndUpdate(id,{$pull : {[checkvote]: idUser}}, {new : true})
        } else {
            return Question.findByIdAndUpdate(id,{$push : {[votetype]: idUser}}, {new : true})
        }
    }

}

module.exports = QuestionController