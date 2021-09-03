'use strict'
const CryptoJS = require('crypto-js') // 引用AES源码js
const key = CryptoJS.enc.Utf8.parse('0102030405060708') // 十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse('0102030405060708') // 十六位十六进制数作为秘钥偏移量
const API = require('../api/index')
const WXBizDataCrypt = require('../utils/wechat/WXBizDataCrypt')
module.exports = {
  // aes 解密方法
  AesDecrypt(word) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  },
  // aes 加密方法
  AesEncrypt(word) {
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString().toUpperCase()
  },
  // 解密微信敏感用户信息 手机号/open_id
  async WechatDecryptInfo(encryptedData, iv, code) {
    const { appId, appScripts } = this.app.config.wechatInfo
    const result = await API.wechat.MinaCode2Session({
      appid: appId,
      secret: appScripts,
      js_code: code,
      grant_type: 'authorization_code'
    })
    const pc = new WXBizDataCrypt(appId, result.session_key)
    const res = pc.decryptData(encryptedData, iv)
    return {
      ...res,
      open_id: result.openid
    }
  },
  WechatPay: require('./wechatPay')
}
