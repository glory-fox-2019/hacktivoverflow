const jwt = require('jsonwebtoken');

module.exports = {
    generateToken (data) {
        return jwt.sign(data, process.env.SECRET_PASSWORD)
    },
    verify(data) {
        return jwt.verify(data, process.env.SECRET_PASSWORD)
    }
}