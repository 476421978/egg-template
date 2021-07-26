/* eslint-disable no-unused-vars */
'use strict'

//  除外
const excepts = [
  '/home/login',
]

module.exports = (options) => {
  return async function (ctx, next) {
    const { url, headers, body } = ctx.request
    // 排除特定路由
    if (excepts.includes(url)) {
      await next()
      return
    }

    // 解密接收数据body

    // 鉴权
    // const token = headers['token']
    // if (!token) throw '缺少token,请重新进行实名绑定'

    await next()

    // 发送数据加密
    // ctx.response.body = ctx.helper.AesEncrypt(ctx.response.body)
  }
}
