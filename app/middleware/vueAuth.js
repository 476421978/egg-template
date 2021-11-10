/* eslint-disable no-unused-vars */
'use strict'
// 权限判断
module.exports = (options) => {
  return async function (ctx, next) {
    const { url, headers, body } = ctx.request
    await next()
  }
}
