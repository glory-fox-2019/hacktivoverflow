const User = require('../models/user');
const { generatetoken, comparePassword, hashPassword } = require('../helpers/helpers');
const transporter = require('../helpers/nodemailer');
const cron = require('node-cron');


class UserController {

  static signin(req, res, next) {
    const { email, password } = req.body
    User.findOne({
        email
      })
      .then(found => {
        if (found) {
          if (comparePassword(password, found.password) == false) throw new Error('wrong password')
          else {
            const isuser = {
              id: found._id,
              name: found.username,
              email: found.email
            }
            const token = generatetoken(isuser)
            res.status(200).json({
              token,
              username: isuser.name,
              _id: isuser.id,
              email: isuser.email
            })
          }
        } else res.status(404).json({ meesage: 'not found' })
      })
      .catch(next)
  }

  static signup(req, res, next) {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
      })
      .then(newUser => {
        cron.schedule('* * * * Monday', () => {
          transporter.sendMail({
            to: req.body.email,
            subject: 'Selamat hari senin:)',
            html:`<p>Buka minggumu dengan semangat, jngn lupa sedekah ya gengs.</p>`
          }, (err, data) => {
            if (err) {
              console.log(err);
              // throw { status: 500, message: 'Internal server error' }
            }
            else console.log('email delivered');
          })
        })
        res.status(201).json(newUser)
      })
      .catch(err => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    console.log(req.params.id);
      User.findOne({
        _id: req.params.id
      })
        .then(found => {
          res.status(200).json(found)
        })
        .catch(next)
    
  }

}

module.exports = UserController