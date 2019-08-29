const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    description: {  
        type: String,
        required: [true, 'You must fill description question']
    },
    owner : {type: Schema.Types.ObjectId, ref: 'User'},
    question : {type: Schema.Types.ObjectId, ref: 'Question'},
    upvotes :  [{type : Schema.Types.ObjectId, ref: 'User'}],
    downvotes : [{type : Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true })

const Answer = mongoose.model('Answer',AnswerSchema)

module.exports = Answer