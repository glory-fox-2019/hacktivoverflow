const User = require('../models/user')
const checkPassword = require('../helpers/bcrypt').comparePassword
const generateToken = require('../helpers/jwt').generateToken
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)

class UserController {
    static async create (req, res, next) {
        try {
            const { username, email, password } = req.body;
            const results = await User.create({ username, email, password })
            res.status(200).json(results)
        }
        catch(err) {
            next(err)
        }
    }

    static async signIn (req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            const isPass = !user ?  false : checkPassword(password, user.password)
            if (isPass) {
                const payload = { id: user._id, username: user.username, email: user.email };
                const token = generateToken(payload);
                res.status(201).json({ id: user._id, username: user.username, token: token })
            }
            else {
                throw {
                    status: 400,
                    message: "Email / Password wrong"
                }
            }
        }
        catch(err) {
            next(err)
        }
    }

    static async googleSignIn (req, res, next) {
        try {
            const { googleUser } = await client.verifyIdToken({ idToken: req.body.id_token, audience: CLIENT_ID })
            const findUser = await User.findOne({ email: googleUser.email })
            if (!findUser) {
                const user = await User.create({ username: googleUser.username, email: googleUser.email, password: process.env.SECRET_PASSWORD })
                const payload = { id: user._id, username: user.username, email: user.email };
                const token = generateToken(payload);
                res.status(201).json({ id: findUser._id, username: findUser.username, token: token })
            }
            else {
                if (checkPassword(process.env.SECRET_PASSWORD,findUser.password)) {
                    const payload = { id: findUser._id, username: findUser.username, email: findUser.email };
                    const token = generateToken(payload)
                    res.status(201).json({ id: findUser._id, username: findUser.username, token: token })
                }
                else {
                    throw { status: 404, message: "You already have an account on this site" }
                }
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = UserController