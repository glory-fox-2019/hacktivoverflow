const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Please enter title correctly"],
        minlength: [4, "Title at least have 4 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter description correctly"],
        minlength: [5, "Description at least have 5 characters"]
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    totalvotes: Number
},{
    timestamps: true,
    versionKey: false
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer