const User = require('../model/user');
const { comparePassword } = require('../helper/bcrypt');
const { generateToken } = require('../helper/jwt');

class UserController {

    static create(req, res, next) {
        const { username, email, password } = req.body;
        User.create({
            username,
            email,
            password
        })
            .then(function (user) {
                res.status(201).json(user);
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                if (user) {
                    if (comparePassword(req.body.password, user.password)) {
                        let payload = {
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        let token = generateToken(payload)
                        
                        res.status(200).json({
                            token,
                            username: user.username
                        })
                    }
                    else {
                        throw { code: 404, message: "wrong email/password" }
                    }
                }
                else {
                    throw { code: 404, message: "wrong email/password" }
                }
            })
            .catch(next)
    }


}

module.exports = UserController;