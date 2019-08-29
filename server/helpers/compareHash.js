const bcryptjs = require('bcryptjs')

function decodePassword(password, hash) {
  return bcryptjs.compareSync(password, hash)
}

module.exports = decodePassword
