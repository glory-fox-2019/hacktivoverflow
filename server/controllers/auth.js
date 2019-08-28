const User              = require('../models/user')
const { decrypt, sign } = require('../helpers')

class AuthController {
    static register(req, res, next) {
        const { name, email, password, watch_tag } = req.body
        User.create(req.body)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log(err)
            if (err.message == 'Email has been taken') {
                next({
                    code : 400,
                    message: 'Email has been taken'
                })
            }
            else if (RegExp('validation').test(err.message)) {
                if (err.errors.email) {
                    next({
                        code: 400,
                        message: err.errors.email.message
                    })
                }
                else {
                    next({
                        code: 403,
                        message: err.message
                    })
                }
            }
            else {
                next(err)
            }
        })
    }

    static login (req, res, next) {
        User.findOne({
                email: req.body.email
        })
        .then(foundUser => {
            if (!foundUser) {
                next({
                    code: 404,
                    message: `User not found`
                })
            }
            else {
                if (decrypt(req.body.password, foundUser.password)) {
                    const token = sign(foundUser._id, foundUser.name)
                    const payload = {
                        accesstoken: token,
                        watch_tag: foundUser.watch_tag,
                        email: foundUser.email
                    }                   
                    res.status(200).json(payload)
                }
                else {
                    next({
                        code: 401,
                        message: `Wrong password`
                    })
                }
            }
        })
        .catch(next)
    }
}

module.exports = AuthController