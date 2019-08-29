const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    UserId:{
        type: Schema.Types.ObjectId, ref: 'User' ,
        required: [true, `To submit a Answer you must login first`]
    },
    answer:{
        type: String,
        required: [true, `Answer's title can't be empty`],
    },
    downvotes:{
        type: [],
    },
    upvotes:{
        type: [],
    }

},{
    versionKey: false,
    timestamps: true
})

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;