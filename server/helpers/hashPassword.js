const bcryptjs = require('bcryptjs')

function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(10)
  return bcryptjs.hashSync(password, salt)
}

module.exports = hashPassword
