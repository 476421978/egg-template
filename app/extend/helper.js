'use strict'
const Crypto = require('crypto') // 引用AES源码js
const API = require('../api/index')
const WXBizDataCrypt = require('../utils/wechat/WXBizDataCrypt')
const stringRandom = require('string-random')

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
  },
  // =============== 支付
  /** v3 发起小程序支付 */
  async WechatPay(openId, orderLsh, payPrice) {
    const { appId, mchId } = this.app.config.wechatInfo

    // 初始化配置
    const pay = this.InitWechat()
    // 内网穿透本地调试
    // const RandomUrl = 'https://9976-113-99-236-83.ngrok.io/mina_app/di_bang/wechat_pay_back'

    // 白名单
    let totalPrice = payPrice
    // excepts 特定用户
    // if (excepts.includes(openId)) {
    //   totalPrice = 1
    // }

    // 全局限制 管理员权限
    if (this.ctx.userInfo && this.ctx.userInfo.mina_auth === 1) {
      totalPrice = 1
    }

    // 支付数据
    const params = {
      appid: appId, // 应用ID string[1,32]
      mchid: mchId, // 直连商户号 string[1,32]
      description: '小程序支付', // 商品描述 string[1,127]
      out_trade_no: stringRandom(32), // 商户订单号[6,32] 只能是数字、大小写字母_-*,并且同一个商户号下唯一
      attach: orderLsh, // 附加数据 string[1,128] 在查询API和支付通知中原样返回，可作为自定义参数使用
      notify_url: this.app.config.notifyUrl, // 通知地址https string[1,256]
      amount: {
        // 订单金额 object
        total: totalPrice // int 单位分
      },
      payer: {
        // 支付者信息
        openid: openId // string[1,128]
      }
    }

    return await pay.transactions_jsapi(params)
  },

  /** 解密回调信息 */
  async DecWechatPayBack(body) {
    const { ipv3 } = this.app.config.wechatInfo
    const { ciphertext, associated_data, nonce } = body.resource
    // 初始化配置
    const pay = this.InitWechat()
    return pay.decipher_gcm(ciphertext, associated_data, nonce, ipv3)
  },

  /** 支付接口初始化 */
  InitWechat() {
    const { appId, mchId } = this.app.config.wechatInfo
    return new WxPay({
      appid: appId,
      mchid: mchId,
      publicKey: fs.readFileSync(`public/apiclient_cert.pem`), // 公钥
      privateKey: fs.readFileSync(`public/apiclient_key.pem`) // 秘钥
    })
  }
}
