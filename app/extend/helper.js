'use strict'
const Crypto = require('crypto') // 引用AES源码js
const API = require('../api/index')
const WXBizDataCrypt = require('../utils/wechat/WXBizDataCrypt')
module.exports = {
  // 解密微信敏感用户信息 手机号/open_id
  async WechatDecryptInfo(encryptedData, iv, code) {
    const { appId, appScripts } = this.app.config.wechatInfo
    const params = {
      appid: appId,
      secret: appScripts,
      js_code: code,
      grant_type: 'authorization_code'
    }
    const result = await API.wechat.MinaCode2Session(params)
    const pc = new WXBizDataCrypt(appId, result.session_key)
    const res = pc.decryptData(encryptedData, iv)
    return {
      ...res,
      open_id: result.openid
    }
  },
  // WechatPay: require('./wechatPay'),
  // sha256
  sha256(val) {
    const signature = Crypto.createHash('sha256').update(val).digest('hex')
    return signature
  }
}
