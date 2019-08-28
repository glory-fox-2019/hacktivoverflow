const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
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
    answer: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    totalvotes: {
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    versionKey: false
})


const Question = mongoose.model('Question', questionSchema)

module.exports = Question