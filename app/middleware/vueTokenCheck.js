/* eslint-disable no-unused-vars */
'use strict'
//  除外
const excepts = ['/vue/vue_login']

module.exports = (options) => {
  return async function (ctx, next) {
    const { app, service } = ctx
    const { jwt, config } = app
    const { url, headers, body } = ctx.request
    const { vueUser } = service
    // 排除特定路由
    if (excepts.includes(url)) {
      await next()
      return
    }

    try {
      // 检查token 获取用户Id
      const token = headers['token']
      if (!token) throw '缺少token,请重新登录'
      jwt.verify(token, config.vueJwt.secret, function (err, decode) {
        //  时间失效的时候/ 伪造的token
        if (err) throw err
        // 全局解密出用户Id，设置全局变量
        ctx.vueUserId = decode.uid
      })
      if (!ctx.vueUserId) throw '解密用户Token信息失败'

      // 查找用户判断权限
      const resUser = await vueUser.findOne({ id: ctx.vueUserId })
      if (!resUser) throw '找不到用户'
    } catch (error) {
      ctx.headErr(error)
      return
    }

    // 解密接收数据body
    await next()
  }
}
