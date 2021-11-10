'use strict'
const Crypto = require('crypto')
module.exports = {
  // sha256
  sha256(val) {
    const signature = Crypto.createHash('sha256').update(val).digest('hex')
    return signature
  }
}
