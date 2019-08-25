const jwt = require('../helpers/jwt');

module.exports = function(req,res,next){
  let decode = req.headers.access_token;
  if(decode && decode !== '[object Object]'){
    decode = jwt.decodeToken(decode);
    req.decode = decode;
    next();
  }else{
    next({httpStatus: 403, message:"User need login"});
  }
}