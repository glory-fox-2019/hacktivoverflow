const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')
const User = require('../models/user')
const Tag = require('../models/tag')

class UserController {

    static signup(req, res, next) {
        console.log(req.body)
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => {
                let payload = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
                let token = jwt.signToken(payload)

                res.status(201).json({
                    token: token,
                    user: payload
                })
            })
            .catch(next)
    }

    static signin(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    let check = bcrypt.compareSync(req.body.password, user.password)
                    if (check) {
                        let payload = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }

                        let token = jwt.signToken(payload)
                        res.status(200).json({
                            token,
                            user: payload
                        })
                    } else {
                        next({
                            code: 400,
                            message: 'Invalid email / password'
                        })
                    }
                } else {
                    next({
                        code: 400,
                        message: 'Invalid email / password'
                    })
                }
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        User.findById(req.headers.decode.id)
            .populate('watchedTags')
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static async watchTag(req, res, next) {
        try {
            let incomingTagsName = req.body.tags
            let incomingTagsId = []
            for (const tagName of incomingTagsName) {
                let findTag = await Tag.findOne({ name: tagName })
                if (findTag) {
                    incomingTagsId.push(findTag._id)
                } else {
                    next({
                        code: 400,
                        message: 'Tag not found.'
                    })
                }
            }

            let updatedUser =
                await User.findOneAndUpdate({ _id: req.headers.decode.id }, { $set: { watchedTags: incomingTagsId } }, { new: true })
                    .populate('watchedTags')

            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController