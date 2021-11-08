'use strict'
const UUID = require('uuid').v4
const dayjs = require('dayjs')
const Service = require('egg').Service
class JwtServer extends Service {
  /** 创建Token
   * exp jwt的过期时间，这个过期时间必须要大于签发时间
   * nbf jwt的生效时间，定义在什么时间之前，该jwt都是不可用的
   * iat jwt的签发时间
   * jti jwt的唯一身份标识
   * uid 自定义 payload 存放 userId
   */
  createToken(userId, secret, expire = 3600) {
    const now = dayjs().unix()
    const Token = this.app.jwt.sign(
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
