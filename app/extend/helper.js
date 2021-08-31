'use strict'
const CryptoJS = require('crypto-js') // 引用AES源码js
const key = CryptoJS.enc.Utf8.parse('0102030405060708') // 十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse('0102030405060708') // 十六位十六进制数作为秘钥偏移量
const crypto = require('crypto')
const fs = require('fs')
const wechatAPI = require('../api').wechat
const stringRandom = require('string-random')
const moment = require('moment')
const x509_1 = require('@fidm/x509')

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

  /**
   * 获取签名
   * @param {*} method Http 请求方式
   * @param {*} url 请求接口 例如/v3/certificates
   * @param {*} timestamp 时间戳
   * @param {*} nonce_str 随机字符串
   * @param {*} body 请求报文主体
   * @returns 加密签名
   */
  getSignature(method, url, timestamp, nonce_str, body) {
    let str = method + '\n' + url + '\n' + timestamp + '\n' + nonce_str + '\n'
    if (body && body instanceof Object) body = JSON.stringify(body)
    if (body) str = str + body + '\n'
    if (method === 'GET') str = str + '\n'
    return this.sha256WithRsa(str)
  },

  // SHA256-RSA加密后转base64
  sha256WithRsa(data) {
    const privateKey = fs.readFileSync(`public/apiclient_key.pem`)
    if (!privateKey) throw '缺少私钥'
    return crypto.createSign('RSA-SHA256').update(data).sign(privateKey, 'base64')
  },

  // 获取序列号
  getSN() {
    const publicKey = fs.readFileSync(`public/apiclient_cert.pem`)
    if (!publicKey) throw '缺少公钥'
    const certificate = x509_1.Certificate.fromPEM(publicKey)
    return certificate.serialNumber
  },

  // 发起请求
  async WechatPayPost() {
    // 支付数据
    try {
      const { appId, mchId } = this.app.config.wechatInfo
      const schema = 'WECHATPAY2-SHA256-RSA2048' // 认证信息
      const timestamp = moment().unix() // 时间戳
      const nonce_str = stringRandom(16) // 随机数
      const notifyUrl = 'https://www.googleapis.com/' // 回调地址
      // 获取证书序号
      const serial_no = this.getSN()
      // body
      const params = {
        appid: appId, // 应用ID string[1,32]
        mchid: mchId, // 直连商户号 string[1,32]
        description: '小程序支付调试', // 商品描述 string[1,127]
        out_trade_no: nonce_str, // 商户订单号[6,32] 只能是数字、大小写字母_-*,并且同一个商户号下唯一
        attach: '自定义数据', // 附加数据 string[1,128] 在查询API和支付通知中原样返回，可作为自定义参数使用
        notify_url: notifyUrl, // 通知地址https string[1,256]
        amount: {
          // 订单金额 object
          total: 1 // int 单位分
        },
        payer: {
          // 支付者信息
          openid: 'o1ZsL5s8U5kzQCDoQSCf46LZmpmo' // string[1,128]
        }
      }

      // 签名
      const sign = this.getSignature('POST', '/v3/pay/transactions/jsapi', timestamp, nonce_str, params) // 获取签名

      // 获取prepay_id
      const authorization = `${schema} mchid="${mchId}",nonce_str="${nonce_str}",timestamp="${timestamp}",serial_no="${serial_no}",signature="${sign}"`
      const res = await wechatAPI.GetPrePayId(
        params,
        authorization
      )
      
      // 小程序支付需要字段
      let preData = {
        status: res.status,
        appId: appId,
        timeStamp: moment().unix(),
        nonceStr: stringRandom(16),
        package: `prepay_id=${res.prepay_id}`,
        signType: 'RSA',
        paySign: ''
      }
      const str = [preData.appId, preData.timeStamp, preData.nonceStr, preData.package, ''].join('\n')
      preData.paySign = this.sha256WithRsa(str)
      return preData
    } catch (error) {
      console.log('error->>>>', error)
    }
  }
}
