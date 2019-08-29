const {  question , answer } = require('../model');

class vote_controller {
    static upVote (req,res,next){
        let kondisi =  false
        question.findById(req.params.id).populate('voter')
        .then(data=>{
            for(let i in data.voter){
                if(data.voter[i]._id == req.decode.data._id){
                    kondisi = true
                }
            }
            if(!kondisi){
                data.voter.push(req.decode.data)
                data.votes += req.body.num
                data.save()
                res.json({
                    m : 'sukses'
                })
            }else {
                res.status(400).json({
                    message : 'anda sudah pernah vote !!!!'
                })
            }
            
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static voteAnswer(req,res,next){
        let kondisi =  false
        answer.findById(req.params.id).populate('voter')
        .then(data=>{
            for(let i in data.voter){
                if(data.voter[i]._id == req.decode.data._id){
                    kondisi = true
                }
            }
            if(!kondisi){
                data.voter.push(req.decode.data)
                data.votes += req.body.num
                data.save()
                res.json({
                    m : 'sukses'
                })
            }else {
                res.status(400).json({
                    message : 'anda sudah pernah vote !!!!'
                })
            }
            
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static getMostVoters (req,res,next){
        question.find({})
        .then(data=>{
            let temp;
            for(let i = 0 ; i < data.length; i++){
                for(let j = 0; j > data.length; j++){
                    if(data[i].votes < data[j].votes){    
                        temp = data[i]
                        data[i] =  data[j]
                        data[j] = temp
                    }
                    // console.log(data[i].voter.length , data[j].voter.length )
                }
                // console.log(data[i])
                if(i == data.length -1){
                    res.json( { name : data[0].title } )
                }
            }
        })
        .catch(err=>{

        })
    }
}

module.exports = vote_controller