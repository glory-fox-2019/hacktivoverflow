const CronJob = require('cron').CronJob;
const Quote = require('inspirational-quotes');
const ModelQuote = require('../models/quote');
const id = "5d67a9eb8d71204e3e514075"

module.exports = () => {
    new CronJob('*/30 * * * *', () => {
        const word = Quote.getQuote()
        ModelQuote.findByIdAndUpdate(id, {
            text: word.text,
            author: word.author
        })
        .then(results => {
            console.log("Updated Quote")
        })
        .catch(err => {
            console.log(err)
        })
    },null, true, 'Asia/Jakarta')
}
