'use strict'
const crypto = require('crypto')
const fs = require('fs')
const wechatAPI = require('../../api').wechat
const stringRandom = require('string-random')
const moment = require('moment')
const x509_1 = require('@fidm/x509')

class WechatPay {
  /**
   *
   * @param {*} appId 小程序Id
   * @param {*} mchId 商户Id
   * @param {*} publicKey 公钥
   * @param {*} privateKey 密钥
   */
  constructor({ appId, mchId, publicKey, privateKey }) {
    this.appId = appId
    this.mchId = mchId
    this.publicKey = publicKey
    this.privateKey = privateKey
  }
  /**
   * 获取签名
   * @param {*} method Http 请求方式
   * @param {*} url 请求接口 例如/v3/certificates
   * @param {*} timestamp 时间戳
   * @param {*} nonce_str 随机字符串
   * @param {*} body 请求报文主体
   * @returns 加密后的签名
   */
  getSignature(method, url, timestamp, nonce_str, body) {
    let str = method + '\n' + url + '\n' + timestamp + '\n' + nonce_str + '\n'
    if (body && body instanceof Object) body = JSON.stringify(body)
    if (body) str = str + body + '\n'
    if (method === 'GET') str = str + '\n'
    return this.sha256WithRsa(str)
  }

  /**
   * @returns 序列号
   */
  getSN() {
    if (!this.publicKey) throw '缺少公钥'
    const certificate = x509_1.Certificate.fromPEM(this.publicKey)
    return certificate.serialNumber
  }

  /**
   * SHA256-RSA加密后转base64
   * @param {*} data 签名
   * @returns 加密签名
   */
  sha256WithRsa(data) {
    if (!this.privateKey) throw '缺少私钥'
    return crypto.createSign('RSA-SHA256').update(data).sign(this.privateKey, 'base64')
  }

  /**
   * 发起请求 支付数据
   * @returns 小程序支付需要字段
   */
  async WechatPayPost({ openId, description, attach, total, notifyUrl }) {
    try {
      const schema = 'WECHATPAY2-SHA256-RSA2048' // 认证信息
      const timestamp = moment().unix() // 时间戳
      const nonce_str = stringRandom(32) // 随机数
      // 获取证书序号
      const serial_no = this.getSN()
      // body
      const params = {
        appid: this.appId, // 应用ID string[1,32]
        mchid: this.mchId, // 直连商户号 string[1,32]
        description: description, // 商品描述 string[1,127]
        out_trade_no: nonce_str, // 商户订单号[6,32] 只能是数字、大小写字母_-*,并且同一个商户号下唯一
        attach: attach, // 附加数据 string[1,128] 在查询API和支付通知中原样返回，可作为自定义参数使用
        notify_url: notifyUrl, // 通知地址https string[1,256]
        amount: {
          // 订单金额 object
          total: total // int 单位分
        },
        payer: {
          // 支付者信息
          openid: openId // string[1,128]
        }
      }
      
      // 签名
      const sign = this.getSignature('POST', '/v3/pay/transactions/jsapi', timestamp, nonce_str, params)

      // 获取prepay_id
      const authorization = `${schema} mchid="${this.mchId}",nonce_str="${nonce_str}",timestamp="${timestamp}",serial_no="${serial_no}",signature="${sign}"`
      const res = await wechatAPI.GetPrePayId(params, authorization)

      // 小程序支付需要字段
      let preData = {
        status: res.status,
        appId: this.appId,
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
      console.log('error-->>', error)
      return false
    }
  }
}

module.exports = WechatPay
