const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Answer = new Schema({
    title: {type: String, required:true},
    description: {type: String},
    upvotes: [{type: ObjectId, ref: "User"}],
    downvotes: [{type: ObjectId, ref: "User"}],
    User: {type: ObjectId, ref:"User"},
    QuestionId: {type: ObjectId, ref:"Question"}
  },
  { timestamps: { 
      createdAt: 'created_at'
    }
});

  const Model = mongoose.model('Answer', Answer);

  module.exports = Model;