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

  // 解密Token
  async decToken(token) {
    const { ctx, app } = this
    const { jwt, config } = app
    try {
      const decode = await jwt.verify(token, config.vueJwt.secret)
      if (!decode) return
      // 全局解密出用户Id，设置全局变量
      return decode.uid
    } catch (e) {
      // 令牌过期 返回独特
      if (e.message === 'jwt expired') {
        ctx.tokenExpErr(e)
      } else {
        // 其他都归结到请求头
        ctx.headErr(e)
      }
    }
  }
}

module.exports = JwtServer
