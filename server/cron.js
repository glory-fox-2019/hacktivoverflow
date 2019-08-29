const { CronJob } = require('cron');
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Question = require('./models/question');


// new CronJob('0  * * * 0', function() {
module.exports = function(){
  console.log('Cron Job Initiated!')
  let arrOfTags = [];
  let popularTags = ['javascript','vue','node'];
  
  new CronJob('0 0 * * * 1', function() {
  console.log('Update Popular Tag Used');

    Question.find().populate('tags')
        .then( questions => {
            questions.forEach( q => {
                arrOfTags.concat(q.tags)
            });
            
            let map = arrOfTags.reduce(function(p, c){
                p[c] = ( p[c] || 0) + 1;
                return p
            }, {})

            popularTags = Object.keys(map).sort(function (a, b) {
                return map[a] < map[b];
            });
        })
        .catch()

    }, null, true, 'Asia/Jakarta');

    module.exports = popularTags;
}