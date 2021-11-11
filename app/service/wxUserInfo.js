'use strict'
const Service = require('egg').Service
class WxUserInfoServer extends Service {
  // 构造函数
  constructor(that) {
    super(that)
    const { WxUserInfo } = that.app.model
    // 常用配置
    this.state = {
      model: WxUserInfo
    }
    that.request.commonServer(this)
  }

  // 授权用户信息 解密保存 基础用户信息/手机号
  async DecUserInfo(params) {
    const { ctx, service } = this
    const { wxUserInfo } = service
    const { encryptedData, iv, code, type } = params
    // 解密 存则更新用户信息 自定义登录状态返回前端保存
    const result = await ctx.helper.WechatDecryptInfo(encryptedData, iv, code)
    // 用户信息
    let res
    if (type === 'UserInfo') {
      res = await wxUserInfo.findOrCreate(
        {
          mina_open_id: result.open_id
        },
        {
          mina_open_id: result.open_id,
          mina_app_id: result.watermark.appid,
          nick_name: result.nickName,
          gender: result.gender,
          language: result.language,
          city: result.city,
          province: result.province,
          country: result.country,
          chat_head: result.avatarUrl
        }
      )
    } else if (type === 'Phone') {
      // 解密手机号
      if (ctx.wxUserInfoId) {
        await wxUserInfo.update(
          {
            mobile: result.phoneNumber
          },
          {
            mina_open_id: result.watermark.appid
          }
        )
      }
      res = result
    } else {
      throw '找不到解密类型'
    }
    return res
  }
}

module.exports = WxUserInfoServer
