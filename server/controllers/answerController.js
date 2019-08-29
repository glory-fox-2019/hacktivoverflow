const Answer = require('../models/Answer')
const Question = require('../models/Question')

class AnswerController {
  static create(req, res, next) {
    const { content, question } = req.body
    const user = req.user
    Answer.create({
      content,
      question,
      user
    })
    .then(data => {
      return Question.findByIdAndUpdate({
        _id: question
      },{
        $push: {
          answer: data._id
        }
      })
    }, {
      new: true
    })
    .then(data => {
      res.json(data)
    })
    .catch(next)
  }
}

module.exports = AnswerController

