const { User } = require('../model');
const {  compare ,  signToken } = require('../helper');
class user_controller {
    static Register(req,res,next){
        console.log('errro nya aa ')
        let {username, password , email} = req.body
        User.create({
            username,password, email
        })
        .then(user=>{
            res.status(201).json({
                token : signToken(user)
            })  
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static login(req,res,next){
        let {  email , password } = req.body;
        User.findOne({
            email
        })
        .then(user=>{
            if(user){
                if(compare(password , user.password)){
                    res.json({
                        token : signToken(user),
                        user
                    })
                }
                else {
                    res.status(400).json({
                        message : 'Username or Password Not Found'
                    })
                    console.log(password , user.password)
                    console.log('password salah')
                }
            }
            else {
                console.log('username salah')
                res.status(400).json({
                    message : 'Username or Password Not Found'
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = user_controller