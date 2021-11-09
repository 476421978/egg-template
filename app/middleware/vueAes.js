;('use strict')

const CryptoJS = require('../utils/cryptoJs/aes_util')
//  除外
// const excepts = ['/home/login']

module.exports = (options) => {
  return async function (ctx, next) {
    // const { url, headers, body } = ctx.request
    const { isDecRequest, isEncResponse } = ctx.app.config.vueAes
    // 排除特定路由
    // if (excepts.includes(url)) {
    //   await next();
    //   return;
    // }

    // aes 尝试解密 解密成功则替换body
    if (isDecRequest) {
      try {
        let reqBody = ctx.request.body
        if (!JSON.parse(CryptoJS.AesDecrypt(reqBody.reqAes))) throw '尝试解密失败/数据格式不对'
        ctx.request.body = JSON.parse(CryptoJS.AesDecrypt(reqBody.reqAes))
      } catch (error) {
        ctx.headErr(error)
        return
      }
    }

    await next()

    // aes 尝试加密 解密成功则替换body.result
    if (isEncResponse) {
      ctx.response.body.result = CryptoJS.AesEncrypt(JSON.stringify(ctx.response.body.result))
    }
  }
}
