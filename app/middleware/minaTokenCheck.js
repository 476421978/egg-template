/* eslint-disable no-unused-vars */
'use strict'
const excepts = ['/mina/dec_user_info', '/mina/refresh_token']
// token检查
module.exports = (options) => {
  return async function (ctx, next) {
    const { service } = ctx
    const { url, headers } = ctx.request
    const { wxUserInfo, jwtServer } = service

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
      ctx.minaUserId = UID
      const resUser = await wxUserInfo.findOne({ id: UID })
      if (!resUser) throw '找不到用户'
    } catch (error) {
      ctx.headErr(error)
      return
    }

    // 解密接收数据body
    await next()
  }
}
