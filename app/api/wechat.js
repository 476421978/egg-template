'use strict'
module.exports = ({ POST, GET, WechatPayPost }) => ({
  // code获取session
  MinaCode2Session: (...data) => GET('https://api.weixin.qq.com/sns/jscode2session', ...data),

  // 获取接口凭证 注意需要开启白名单
  GetAccessToken: (...data) => GET('https://api.weixin.qq.com/cgi-bin/token', ...data),

  // 发送小程序订阅消息
  SendMinaSubscribe: (...data) =>
    POST('https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=', ...data),

  // JSAPI
  GetPrePayId: (data, authorization) =>
    WechatPayPost('https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi', data, authorization)
})
