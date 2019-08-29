const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Question = new Schema({
    title: {type: String, required:true},
    description: {type: String},
    upvotes: [{type: ObjectId, ref: "User"}],
    downvotes: [{type: ObjectId, ref: "User"}],
    User: {type: ObjectId, ref:"User"},
    Tags: [{type: String}]
  },
  { timestamps: { 
      createdAt: 'created_at'
    }
});

  const Model = mongoose.model('Question', Question);

  module.exports = Model;