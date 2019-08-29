const User = require('../models/user');
const { comparePassword, generateJWT } = require('../helpers/helper');

class AuthController {
    static register(req, res, next) {
        User
            .create(req.body)
            .then(newUser => {
                res
                    .status(201)
                    .json(newUser);
            })
            .catch(err => {
                if (err.message === 'Email has been taken') {
                    res
                        .status(409)
                        .json({
                            message: err.message
                        })
                } else if (RegExp('validation').test(err.message)) {
                    if (err.errors.email) {
                        res
                            .status(400)
                            .json({
                                message: err.errors.email.message
                            })
                    } else {
                        res
                            .status(403)
                            .json({
                                message: err.message
                            })
                    }
                } else {
                    next(err);
                }
            });
    }

    static login(req, res, next) {
        User
            .findOne({
                email: req.body.email
            })
            .then(foundUser => {
                if (!foundUser) {
                    res
                        .status(404)
                        .json({
                            message: 'User not found'
                        });
                } else {
                    if (comparePassword(req.body.password, foundUser.password)) {
                        const token = generateJWT(foundUser._id, foundUser.name);

                        res
                            .status(200)
                            .json({
                                access_token: token,
                                userId: foundUser._id,
                                name: foundUser.name,
                                watch_tag: foundUser.watch_tag
                            });
                    } else {
                        res
                            .status(401)
                            .json({
                                message: 'Wrong password'
                            });
                    }
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static editWatchTag(req, res, next) {
        User
            .findOneAndUpdate({
                _id: req.authenticatedUser._id
            }, {
                $set: req.body
            }, { new: true })
            .then(user => {
                if (!user) {
                    res
                        .status(404)
                        .json({
                            message: 'User not found'
                        })
                } else {
                    res
                        .status(200)
                        .json({
                            watch_tag: user.watch_tag
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getMyTag(req, res, next) {
        User
            .findOne({
                _id: req.authenticatedUser._id
            }, { watch_tag: 1 })
            .then(user => {
                res
                    .status(200)
                    .json({
                        watch_tag: user.watch_tag
                    })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = AuthController;