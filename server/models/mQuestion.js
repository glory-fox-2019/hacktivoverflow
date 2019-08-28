const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema =  new Schema({
    title : {
        type: String,
        required: [true, 'You must fill title question']
    },
    description: {
        type: String,
        required: [true, 'You must fill description question']
    },
    owner : {type: Schema.Types.ObjectId, ref: 'User'},
    answer : [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    upvotes :  [{type : Schema.Types.ObjectId, ref: 'User'}],
    downvotes : [{type : Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true })

const QuestionModel = mongoose.model('Question', QuestionSchema)

module.exports = QuestionModel