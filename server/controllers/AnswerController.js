const Answer = require('../models/Answer')
const Question = require('../models/Question')

class AnswerController {
  static create(req, res, next){
    console.log('masuk controller answer create')
    let {content} = req.body
    let UserId = req.decode._id
    let QuestionId = req.params.id
    let AnswerId
    Answer.create({content, UserId, QuestionId})
      .then((answer)=>{
        AnswerId = answer._id
        return Question.findOne({
          _id: QuestionId
        })
      })
      .then((question)=>{
        question.AnswerId.push(AnswerId)
        return question.save()
      })
      .then((result)=>{
        res.status(201).json(result)
      })
      .catch(next)
  }

  static findById(req,res,next){
    Answer.findOne({
      _id: req.params.id
    })
      .then((answer)=>{
        res.status(200).json(answer)
      })
      .catch(next)
  }

  static update(req,res,next){
    console.log('masuk controller answer update', req.body)
    let {content} = req.body
    Answer.updateOne({
      _id: req.params.id
    }, {content})
      .then((updated)=>{
        res.status(200).json(updated)
      })
      .catch(next)
  }

  static delete  (req, res, next){
    Answer.findOne({
      _id: req.params.id
    })
      .then((answer)=>{
        return Question.updateOne({
          _id: answer.QuestionId
        }, { $pull: { AnswerId: { $in: [ req.params.id ] }} })
      })
      .then((question)=>{
        return Answer.deleteOne({
          _id : req.params.id
        })
      })
      .then((result)=>{
        res.status(200).json({status: "delete success"})
      })
      .catch(next)

  }

  static upvotes(req,res,next){
    console.log('masuk controller answer upvotes')
    let flag = true;
    let notFound = true;

    Answer.findOne({
      _id: req.params.id
    })
      .then((answer)=>{
        console.log(answer.downvotes.length)
        for (let i=0; i<answer.upvotes.length; i++){
          if (`${answer.upvotes[i]}` === `${req.decode._id}`){
            res.status(200).json('Cannot upvotes')
            flag = false
          }
        }
        for (let i=0; i<answer.downvotes.length; i++){
          if (`${answer.downvotes[i]}` === `${req.decode._id}`){
            answer.downvotes.splice(i, 1)
            notFound = false;
            return answer.save()
          }
        }
        if (flag && notFound){
          answer.upvotes.push(req.decode._id)
        }
        return answer.save()
      })
      .then((result)=>{
        res.status(200).json(result)
      })
      .catch(next)
  }

  static downvotes(req, res, next){
    console.log('masuk controller answer downvotes')
    let flag = true;
    let notFound = true;

    Answer.findOne({
      _id: req.params.id
    })
      .then((answer)=>{
        for (let i=0; i<answer.downvotes.length; i++){
          if (`${answer.downvotes[i]}` === `${req.decode._id}`){
            res.status(200).json('Cannot downvotes')
            flag = false
          }
        }
        for (let i=0; i<answer.upvotes.length; i++){
          if (`${answer.upvotes[i]}` === `${req.decode._id}`){
            answer.upvotes.splice(i, 1)
            notFound = false;
            return answer.save()
          }
        }
        if (flag && notFound){
          answer.downvotes.push(req.decode._id)
        }
        return answer.save()
      })
      .then((result)=>{
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = AnswerController