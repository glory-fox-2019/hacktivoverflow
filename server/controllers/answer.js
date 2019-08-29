const Model = require('../models');

class Answer {
  static create(req,res,next){
    let answerData;
    Model.Answer
      .create({
        title: req.body.title,
        description: req.body.description,
        user: req.decode._id,
      })
      .then(data => {
        return data.populate('user','name email').execPopulate()
      })
      .then(data => {
        console.log(req.params.idquestion, data._id)
        answerData = data;
        return Model.Question
          .findOneAndUpdate({_id: req.params.idquestion},{
            $push: {answers: answerData._id}
          })
        })
      .then(data => {
        res.status(201).json(answerData);
      })
      .catch(next);
  }
  static edit(req,res,next){
    console.log('test',req.params.idanswer)
    Model.Answer
      .findByIdAndUpdate(req.params.idanswer, {
        title: req.body.title,
        description: req.body.description,
      },{new: true})
      .populate('user', 'name email')
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Answer not found'})
        res.json(data);
      })
      .catch(next)
  }
  static delete(req,res,next){
    Model.Answer
      .deleteOne({_id: req.params.idanswer})
      .then(data => {
        if(data.deletedCount === 0) next({httpStatus: 404, message: 'Answer not found'})
        res.json({
          delete: data.deletedCount,
          message: 'Successfully Delete Answer',
        })
      })
      .catch(next);
  }

  static upvote(req,res,next){
    Model.Answer
      .findByIdAndUpdate(req.params.idanswer, {
        $pull: { downvotes: req.decode._id }
      })
      .then(data => {
        return Model.Answer
          .findOne({
            upvotes: req.decode._id
          })
        })
        .then(data => {
          if(data) return data
          return Model.Answer
            .findByIdAndUpdate(req.params.idanswer, {
              $push: { upvotes: req.decode._id }
            })
        })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Answer not found'})
        res.json({update: data.length, message: 'Upvote Success!'});
      })
      .catch(next);
  }
  static netralvote(req,res,next){
    Model.Answer
      .findByIdAndUpdate(req.params.idanswer, {
        $pull: { upvotes: req.decode._id }
      })
      .then(data => {
        return Model.Answer
          .findByIdAndUpdate(req.params.idanswer, {
            $pull: { downvotes: req.decode._id }
          })
      })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Answer not found'})
        res.json({update: data.length, message: 'Netral vote Success!'});
      })
      .catch(next);

  }

  static downvote(req,res,next){
    Model.Answer
      .findByIdAndUpdate(req.params.idanswer, {
        $pull: { upvotes: req.decode._id }
      })
      .then(data => {
        return Model.Answer
          .findOne({
            downvotes: req.decode._id
          })
        })
        .then(data => {
          if(data) return data
          return Model.Answer
            .findByIdAndUpdate(req.params.idanswer, {
              $push: { downvotes: req.decode._id }
            })
        })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Answer not found'})
        res.json({update: data.length, message: 'Downvote Success!'});
      })
      .catch(next);
  }
}

module.exports = Answer;