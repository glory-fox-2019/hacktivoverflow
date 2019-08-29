const Jwt = require('../helper/jwt');
const Question = require('../models/model-question');

function authentication(req, res, next) {
  try {
    let decoded = Jwt.verifyJwt(req.headers.token)
    req.decoded = decoded
    // console.log(req.decoded, ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ');
    next();
  }
  catch (err) {
    next(err)
  }

}

function authorize(err, req, res, next) {

  Question
    .findOne({
      _id: req.params.id,
    })
    .then(question => {
      if (question) {
        // console.log(req.decoded.id, 'dari helper auth');
        if (question.userId == req.decoded._id) {
          next()
        } else {
          res.status(401).json({ error: 'forbidden access' })
        }
      } else {
        res.status(403).json({ error: 'question not found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = { authorize, authentication }