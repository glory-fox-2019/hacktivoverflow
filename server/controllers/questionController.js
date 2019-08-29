const Question = require('../models/Question')

class QuestionController {
  static create(req, res, next) {
    const { title, content } = req.body
    Question.create({
      title,
      content,
      user: req.user
    })
    .then(question => {
      res.status(201).json({
        question
      })
    })
    .catch(next)
  }

  static getAll(req, res, next) {
    Question.find()
      .populate('user', 'username email')
      .populate('upVote', 'username')
      .populate('downVote', 'username')
      .exec(function (err, questions) {
        if(err) {
          return next(err)
        }else{
          res.json(questions)
        }
      })
  }

  static findOne(req, res, next) {
    Question.findOne({
      _id: req.params.id
    })
    .populate('user')
    .populate({
      path: 'answer',
      populate: {
        path: 'user'
      }
    })
    .exec(function (err, question) {
      if(err) {
        return next(err)
      }else{
        res.json(question)
      }
    })
  }

  static upvote(req, res, next) {
    Question.findByIdAndUpdate({
      _id: req.body.id
    },{
      $push: {
        upVote: req.user
      }
    },{
      new: true
    })
    .then(data => {
      res.json(data)
    })
    .catch(next)
  }
}

module.exports = QuestionController