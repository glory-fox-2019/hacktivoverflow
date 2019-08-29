const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    voter : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    votes : {
        type : Number,
        ref : 'User',
        default : 0
    },
    question : {type: Schema.Types.ObjectId, ref: 'question'},
    User : {type: Schema.Types.ObjectId, ref: 'User'}
},{timestamps : { createdAt : 'created_at'}});

let answer = mongoose.model('answer' , answerSchema)


module.exports = answer