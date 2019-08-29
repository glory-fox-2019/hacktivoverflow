const jwt = require('jsonwebtoken');
const { TokenVerify} = require('../helper')
// const { article } = require('../model')
const {  answer } = require('../model')
module.exports = {
    VerifyToken : (token)=>{
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded)
            console.log(decoded , ' di middelware')
            req.decoded = decoded
          } catch(err) {
            // err
          }
    },
    Authenthication : (req,res,next)=>{
        try {
          const decoded = TokenVerify(req.headers.token)
          console.log(decoded , ' di middelware');
          req.decode = decoded;
          next()
        }catch (err){
            // console.log(req.headers)
            console.log('nggak ada ya')
          res.status(403).json({
            message : "anda tidak memilik akses"
          })
        }
    },
    Authorized : (req,res,next)=>{
      answer.findOne({
        _id : req.params.id,
        User : req.decode.data._id
      })
      .then(user=>{
        console.log(' sampai di authorized middelware' , user , '<<<<<===========')
        if(user){
          next()
        }else {
          res.status(403).json({
            message : "You don't have access!!!!"
          })
        }
      })
      .catch(err=>{
        next(err)
      })
    }
}

