const Helper = require('../helpers/helpers');

module.exports = (req, res, next) => {
  if (!req.headers.token) res.status(403).json({ message: 'Authentication failed' });
  else {
      try {
        req.decoded = Helper.verifyJWT(req.headers.token, process.env.JWT_SECRET)
        next()
      } 
      catch (err) {
      res.status(500).json(err);
    }
  }
}