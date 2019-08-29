const Answer = require('../models/answer');
const Question = require('../models/question');

class AnswerContoller {

  static create(req, res, next) {

    Answer.create({
      QuestionId: req.body.QuestionId,
      content: req.body.content,
      UserId: req.body.UserId
    })
      .then(newAnswer => {
        return Question.update({
          _id: req.body.QuestionId
        }, {
          $push: { AnswerId: newAnswer._id }
        })
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static findOne(req, res, next) {

  }

  static findAll(req, res, next) {

  }

  static delete(req, res, next) {
    Answer
      .findByIdAndDelete(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(next);
  }

  static update(req, res, next) {
    Answer
      .findByIdAndUpdate({ _id: req.params.id }, { content: req.body.content })
      .populate("UserId")
      .then(updated => res.status(200).json(updated))
      .catch(next)
  }

  static vote(req, res, next) {
    const voteType = req.query.type 
    const answerId = req.params.id
    const userId = req.decoded.id

    Answer
      .findOne({ _id: answerId })
      .populate("UserId")
      .then(found => {
        if(!found) throw new Error('answer not found')
        else {
          if(voteType == 'upvote') {
              if(found.upvote.includes(userId)) throw new Error('you already vote')
              else if(found.downvote.includes(userId)) {
                found.downvote.pull(userId)
                found.upvote.push(userId)
              }
              else found.upvote.push(userId)
            }
          else if(voteType == 'downvote') {  
              if(found.downvote.includes(userId)) throw new Error('you already vote')
              else if(found.upvote.includes(userId)) {
                found.upvote.pull(userId)
                found.downvote.push(userId)
              }
              else found.downvote.push(userId)
          }
          else throw new Error('invalid vote type')
          console.log(found);
          return found.save()
        } 
      })
      .then(answer => res.status(200).json(answer))
      .catch(next)      
  }

}

module.exports = AnswerContoller