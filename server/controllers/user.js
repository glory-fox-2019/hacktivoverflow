const { OAuth2Client } = require("google-auth-library"),
  { compare } = require("../helpers/bcryptjs"),
  { sign } = require("../helpers/jwt"),
  User = require("../models/user"),
  client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = class UserController {
  static signUp(req, res, next) {
    const { username, email, password } = req.body

    User.create({ username, email, password })
      .then( user => {
          res.status(201).json(user)
      })
      .catch(next);
  }

  static signIn(req, res, next) {
    let payload = {}, token = '';
    const { email, password } = req.body
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          if (compare(password, user.password)) {
            payload._id = user._id
            payload.email = user.email
            payload.username = user.username

            token = sign(payload);
            res.status(200).json({ access_token: token, id: user._id });
          } else {
            next({ code: 400, message: "Wrong email/password" })  
          }
        } else {
          next({ code: 400, message: "Wrong email/password" })
        }

      })
      .catch(next);
  }

  static googleSignIn(req, res, next) {
    let payload, token;
    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload();
        return User.findOne({ email: payload.email });
      })
      .then(user => {
        if (user) {
          return user;
        } else {
          let newUser = new User({
            username: payload.name,
            email: payload.email,
            password: payload.jti
          });
          return newUser.save();
        }
      })
      .then(loggedIn => {
        if(loggedIn) {
          return User.findOne({ email: payload.email })
        }
      })
      .then(user => {
        if (user) {
            payload = {}
            payload._id = user._id
            payload.email = user.email
            payload.username = user.username

            token = sign(payload);
            res.status(200).json({ access_token: token, id: user._id });
        } else {
          next({ code: 400, message: "Wrong email/password" })
        }
      })
      .catch(next);
  }

  static findWatchedTags(req, res, next) {
    const id = req.decoded._id

    User.findById(id)
      .then( data => {
        res.status(200).json(data.watchedTags)
      })
      .catch(next)
  }

  static addWatchedTags(req,res,next) {
    const id = req.decoded._id
    const tagName = req.body.tagName

    User.findByIdAndUpdate(id, { $push: { watchedTags: tagName } })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static removeWatchedTags(req, res,next) {
    const id = req.decoded._id
    const tagName = req.body.tagName

    User.findByIdAndUpdate(id, { $pull: { watchedTags: tagName } })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
};
