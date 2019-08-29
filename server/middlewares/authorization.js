const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
  authorizationQuestion(req, res, next) {
    Question.findOne({
        _id: req.params.id,
        UserId: req.decoded.id
      })
      .then(found => {
        if (!found) throw new Error('You dont have access')
        else next()
      })
      .catch(next)
  },

  authorizationAnswer(req, res, next) {
    Answer.findOne({
        _id: req.params.id,
        UserId: req.decoded.id
      })
      .then(found => {
        if (!found) throw new Error('You dont have access')
        else next()
      })
      .catch(next)
  },

}