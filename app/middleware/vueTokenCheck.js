/* eslint-disable no-unused-vars */
'use strict'
//  除外
const excepts = ['/vue/vue_login', '/vue/refresh_token']

module.exports = (options) => {
  return async function (ctx, next) {
    const { app, service } = ctx
    const { jwt, config } = app
    const { url, headers, body } = ctx.request
    const { vueUser, jwtServer } = service
    // 排除特定路由
    if (excepts.includes(url)) {
      await next()
      return
    }

    try {
      // 检查token 获取用户Id
      const token = headers['token']
      if (!token) throw '缺少token,请重新登录'

      // 解密token
      const UID = await jwtServer.decToken(token)
      if (!UID) return

      // 查找用户判断权限
      ctx.vueUserId = UID
      const resUser = await vueUser.findOne({ id: UID })
      if (!resUser) throw '找不到用户'
    } catch (error) {
      ctx.headErr(error)
      return
    }

    // 解密接收数据body
    await next()
  }
}
