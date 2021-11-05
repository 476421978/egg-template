'use strict'
const UUID = require('uuid').v4
const Service = require('egg').Service
class JwtServer extends Service {
  // 创建Token
  async createToken(userId, secret, expire = '1h') {
    const { jwt } = this.app
    const Token = jwt.sign(
      {
        jti: UUID(),
        iat: now,
        nbf: now,
        exp: now + expire,
        uid: userId
      },
      secret
    )
    return Token
  }
}

module.exports = JwtServer
