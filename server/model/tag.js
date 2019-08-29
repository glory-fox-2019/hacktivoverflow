const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    question : [{type: Schema.Types.ObjectId, ref: 'question'}]    
});

let tag = mongoose.model('tag' , tagSchema)


module.exports = tag