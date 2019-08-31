const Model = require('../models');
module.exports = {
  question(req,res,next){
    Model.Question
      .findOne({
        _id: req.params.id,
      })
      .then(data => {
        if(data){
          if(String(data.user) !== req.decode._id) next({httpStatus: 401, message: 'Unauthorize Access'})
          else next();
        }
        else next({httpStatus: 404, message:"Question not found"})
      })
  },
  answer(req,res,next){
    Model.Answer
      .findOne({
        _id: req.params.idanswer,
      })
      .then(data => {
        if(data){
          if(String(data.user) !== req.decode._id) next({httpStatus: 401, message: 'Unauthorize Access'})
          else next();
        }
        else next({httpStatus: 404, message:"Answer not found"})
      })
  },
  comment(req,res,next){
    Model.Comment
      .findOne({
        _id: req.params.id,
      })
      .then(data => {
        if(data){
          if(String(data.user) !== req.decode._id) next({httpStatus: 401, message: 'Unauthorize Access'})
          else next();
        }
        else next({httpStatus: 404, message:"Comment not found"})
      })
  },
}
