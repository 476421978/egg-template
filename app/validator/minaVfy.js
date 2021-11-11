/**
 *  使用方法
 *  const params = this.ctx.JoiVue('GetUserIdentity')
 *  if (!params) return
 */
'use strict'
module.exports = (app) => {
  const Joi = app.Joi
  return {
    // 解密微信用户敏感信息 手机号 open_id
    DecUserInfo: Joi.object().keys({
      code: Joi.string(),
      type: Joi.string(),
      encryptedData: Joi.string(),
      iv: Joi.string()
    }),
    // 获取微信用户信息
    GetWxUserInfo: Joi.object().keys({}),
    // 获取微信配置信息
    GetMinaInfo: Joi.object().keys({
      app_name: Joi.string()
    }),
    // 刷新Token
    RefreshToken: Joi.object().keys({}),
    // 创建用户
    createUser: Joi.object().keys({
      account: Joi.string().required(),
      password: Joi.string().required()
    }),
    // 删除用户
    deleteUser: Joi.object().keys({
      account: Joi.string()
    }),
    // 更新用户
    updateUser: Joi.object().keys({
      password: Joi.string()
    }),
    // 查询用户
    getUser: Joi.object().keys({
      account: Joi.string()
    }),
    // 获取用户列表
    getUserList: Joi.object().keys({
      pages_size: Joi.number(),
      pages_num: Joi.number(),
      search_txt: Joi.string()
    }),
    // 签名验证头部字段
    minaSign: Joi.object().keys({
      vue_signature: Joi.string().length(64).required(), // 请输入正确 signature
      vue_timestamp: Joi.string().length(10).required(), // 请输入正确 timestamp
      vue_nonce: Joi.string().length(16).required() // 请输入正确 nonce
    })
  }
}
