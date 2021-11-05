/* eslint-disable no-unused-vars */
'use strict'
//  除外
const excepts = ['/vue/vue_login']

module.exports = (options) => {
  return async function (ctx, next) {
    const { app } = ctx
    const { jwt, config } = app
    const { url, headers, body } = ctx.request

    // 排除特定路由
    if (excepts.includes(url)) {
      await next()
      return
    }

    try {
      // 鉴权
      const token = headers['token']
      if (!token) throw '缺少token,请重新登录'
      jwt.verify(token, config.signInfo.vueJwtSecret, function (err, decode) {
        //  时间失效的时候/ 伪造的token
        if (err) throw err
        // if (Date.now() - decode.exp > 0) throw 'Token已过期,请重新登录'
        //decode.account
        // 全局解密出用户Id，设置全局变量
        ctx.vueUserId = decode.user_id
        next()
      })
    } catch (error) {
      ctx.headErr(error)
      return
    }

    // 解密接收数据body
    await next()
  }
}
