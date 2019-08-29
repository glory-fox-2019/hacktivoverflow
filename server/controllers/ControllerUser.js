const User = require('../models/User')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
class ControllerUser{
    static login(req,res,next){
    const{email,password} = req.body
        User.findOne({email})
            .then(data=>{
                if(data){
                    if(bcrypt.comparePassword(password,data.password)){
                        const {_id, name,email} = data
                        req.headers.token = jwt.generateToken({_id,name,email})
                        res.json({token : req.headers.token, _id: _id})
                    }else{
                        res.status(404).json({message : 'invalid password/username'})
                    }  
                }else{
                    res.status(404).json({message : 'invalid password/username'})
                }
            })
            .catch(err=>{
                next(err)
            
            })
    }

    static register(req,res,next){
        let {name,email,password} = req.body
        password = bcrypt.hashPassword(password)
        User.create({
            name,
            email,
            password
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })

    }

}

module.exports = ControllerUser