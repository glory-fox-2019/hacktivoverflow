const Tag = require('../models/Tag')
const Question = require('../models/Question')

class TagController {
  static findAll(req,res,next){
    Tag.find()
      .then((tags)=>{
        res.status(200).json(tags)
      })
      .catch(next)
  }


  static findById(req,res,next){
    console.log('masuk controller tag findById')
    Question.find({
      tags: { $in: [ req.params.id ] }
    }).populate('UserId').populate('tags').populate('AnswerId')
    .then((tags)=>{
      res.status(200).json(tags)
    })
    .catch(next)
  }

}

module.exports = TagController