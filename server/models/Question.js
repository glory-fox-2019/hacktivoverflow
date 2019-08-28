const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema ({
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    upvotes : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    downvotes : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }]
},{
    timestamps : true,
    versionKey : false
})

const Question= mongoose.model("Question", QuestionSchema)

module.exports = Question
