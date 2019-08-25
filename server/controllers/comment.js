const Model = require('../models');

class Comment {
  static createOnAnswer(req,res,next){
    let commentData;
    Model.Comment
      .create({
        text: req.body.text,
        user: req.decode._id,
      })
      .then(data => {
        commentData = data;
        return Model.Answer
          .findByIdAndUpdate(req.params.idanswer, {
            $push: { comments: commentData._id}
          })
      })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Answer not found'})
        else res.status(201).json(commentData);
      })
      .catch(next);
  }
  static createOnQuestion(req,res,next){
    let commentData;
    Model.Comment
      .create({
        text: req.body.text,
        user: req.decode._id,
      })
      .then(data => {
        commentData = data;
        console.log('masuk create on question', req.params.idquestion)
        return Model.Question
          .findByIdAndUpdate(req.params.idquestion, {
            $push: { comments: commentData._id}
          })
      })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Question not found'})
        else res.status(201).json(commentData);
      })
      .catch(next);
  }
  static edit(req,res,next){
    Model.Comment
      .findOne({id: req.params.id})
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Comment not found'})
        res.json(data);
      })
  }
  static delete(req,res,next){
    Model.Comment
      .deleteOne({id: req.params.id})
      .then(data => {
        if(data.deletedCount === 0) next({httpStatus: 404, message: 'Comment not found'})
        res.json({
          delete: data.deletedCount,
          message: 'Successfully Delete Comment',
        })
      })
  }
}

module.exports = Comment;