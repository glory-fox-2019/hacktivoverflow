const Question = require('../models/mQuestion')
const Filter = require('bad-words') 

async function getWords(){
    let result = await Question.find()
    return result
}

function changeWord(data){
    const filter = new Filter();
    data.description = filter.clean(data.description)
    return data
}

function update(data){
    return Question.findByIdAndUpdate(data._id, {description: data.description},{new: true})
    .then(data => {
       
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    getWords,
    changeWord,
    update
}