const Model = require('../models');
const jwt = require('../helpers/jwt');
const bcrypt = require('../helpers/bcrypt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

class User {
  static register(req,res,next){
    Model.User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      .then(data => {
        let payload = {
          _id: data._id,
          name: data.name,
          email: data.email,
          loginWith: data.loginWith,
        }
        let access_token = jwt.generateToken(payload);
        res.status(201).json({access_token, payload});
      })
      .catch(next)
  }
  static login(req,res,next){
    Model.User
      .findOne({
        email: req.body.email
      })
      .then(data => {
        if(!data) next({httpStatus: 403, message: 'Wrong Email/Password'})
        else {
          if(bcrypt.comparePassword(req.body.password, data.password)){
            let payload = {
              _id: data._id,
              name: data.name,
              email: data.email,
              loginWith: data.loginWith,
            }
            let access_token = jwt.generateToken(payload);
            res.status(201).json({access_token, payload});
          }else{
            next({httpStatus: 403, message: 'Wrong Email/Password'})
          }
        }
      })
  }

  static loginWithGoogle(req,res,next){
    let googlePayload;
    client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
      })
      .then((ticket) => {
        googlePayload = ticket.getPayload();
        return Model.User
          .findOne({
            email: googlePayload.email,
          })
      })
      .then(data => {
        if(data) {
          if(data.loginWith === 'google'){
            return data;
          }else if(data.loginWith === 'normal'){
            next({httpStatus: 403, message: 'This email already in used'})
          }
        }else{
          return Model.User
            .create({
              name: googlePayload.name,
              password: 'f4804q08hq24h80309uwr',
              email: googlePayload.email,
              loginWith: 'google',
            })
        }
      })
      .then(data => {
        let payload = {
          _id: data._id,
          name: data.name,
          email: data.email,
          loginWith: data.loginWith,
        }
        let token = jwt.generateToken(payload);
        res.json({token, payload});
      })
      .catch(next);
  }

  static getUser(req,res,next){
    Model.User
      .findById(req.decode._id)
      .then(data => {
        let payload = {
          _id: data._id,
          name: data.name,
          email: data.email,
          loginWith: data.loginWith,
        }
        res.json(payload);
      })
      .catch(next);
  }
}

module.exports = User;