const Top = require('../models/top')
const express = require('express')
const router = express.Router()
const Question = require('../models/question')

router.post('/', (req, res, next) => {
    Top.create({
        name: 'topThree',
        topThree: []
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
    Top.findById('5d67a27633baa134a0f5b721')
    .then(data => {
        res.status(200).json(data.topThree)
    })
    .catch(next)
})

new CronJob('0 7 * * 1', function() {
    let arr = []
        Question.find().populate('userId')
        .then(results => {
            for(let i = 0; i < results.length; i++) {
                let top = {}
                top.title = results[i].title
                top.vote = results[i].upVote.length - results[i].downVote.length
                top.name = results[i].userId.name
                arr.push(top)
            }
            arr.sort(function(a,b) {
                return b.vote - a.vote
            })
            let newArr = arr.slice(0,3)
            let topId = '5d67a27633baa134a0f5b721'
            Top.findByIdAndUpdate(topId, {$set: {topThree: []}}, {new: true, runValidators: true})
            .then(tops => {
                Top.findByIdAndUpdate(topId, {$push:{topThree: newArr}}, {new: true, runValidators: true})
                .then(data => {
                    res.status(200).json(data)
                })
            })
            .catch(next)
        })
        .catch(next)
  }, null, true, 'Asia/Jakarta');

module.exports = router