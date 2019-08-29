const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    UserId:{
        type: Schema.Types.ObjectId, ref: 'User' ,
        required: [true, `To submit a question you must login first`]
    },
    title:{
        type: String,
        required: [true, `Question's title can't be empty`],
    },
    description:{
        type: String,
        required: [true, `Question's title can't be empty`],
    },
    downvotes:{
        type: [],
    },
    upvotes:{
        type: [],
    },
    answers:[{ type: Schema.Types.ObjectId, ref: 'Answer' }]

},{
    versionKey: false,
    timestamps: true
})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;