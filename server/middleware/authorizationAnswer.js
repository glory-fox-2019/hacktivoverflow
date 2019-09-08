const Answer = require('../models/Answer')


function authorization(req,res,next){
    
    console.log('authorization')
    let id = req.params.id
    // console.log(id)
    Answer.findOne({
        '_id':id,
        'UserId': req.decode.id 
    })
    .then(Answer=>{
        // console.log(Answer)
        if (!Answer){
            console.log('masuk ke null')
            res.status(401).json(`${req.decode.username} not authorized please check carefully`)
        }
        else{
            next()
        }
        
    })
    .catch(err=>{
        console.log("masuk ke catch")
        res.status(500).json(err)
    })
}

module.exports = authorization
