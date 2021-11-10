/* eslint-disable no-unused-vars */
'use strict'
const qs = require('qs')

//  sha256 数据签名
const excepts = ['/home/login']
module.exports = (options) => {
  return async function (ctx, next) {
    const { vueSignScript } = ctx.app.config
    const { headers } = ctx.request

    const signBody = {
      vue_signature: headers['vue-signature'],
      vue_nonce: headers['vue-nonce'],
      vue_timestamp: headers['vue-timestamp']
    }

    const validResult = await ctx.JoiCustom('vueSign', signBody)
    if (!validResult) return

    // 验证接收参数格式 签名保证数据一致性
    const { vue_timestamp, vue_nonce, vue_signature } = signBody
    const qsStringify = qs.stringify(ctx.request.body, {
      sort: (a, b) => a.localeCompare(b),
      encode: false
    })
    const checkSignVal = ctx.helper.sha256(`${vue_timestamp}${vueSignScript}${qsStringify}${vue_nonce}`)

    if (checkSignVal !== vue_signature) {
      ctx.fail('签名不一致')
      return
    }

    await next()
  }
}
