/* eslint-disable no-unused-vars */
'use strict'
//  除外
const excepts = ['/home/login']

module.exports = (options) => {
  return async function (ctx, next) {
    const { url, headers, body } = ctx.request
    // 排除特定路由
    // if (excepts.includes(url)) {
    //   await next()
    //   return
    // }

    // 解密接收数据body
    await next()
  }
}
