const User = require('../models/mUser')
const { createToken } = require('../helpers/jwt')
const { verifyPassword }  = require('../helpers/bcrypt')

class UserController {
    static register(req,res,next){
        const { username, email, password} = req.body
        User.create( { username, email, password })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static login(req,res,next){
        const { email, password } = req.body
        User.findOne({email})
            .then(data => {
                if(data){
                    if(verifyPassword(password, data.password)){
                        const token = createToken(data)
                        data.password = undefined
                        res.status(200).json({token,data})
                    } else {
                        let err = {};
                        err.message = 'Email / Password not found!';
                        err.statusCode = 404;
                        next(err)
                    }
                } else {
                    let err = {};
                    err.message = 'Email / Password not found!';
                    err.statusCode = 404
                    next(err)
                }
            })
            .catch(next)
    }
}

module.exports = UserController