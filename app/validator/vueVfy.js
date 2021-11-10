/**
 *  使用方法 默认 ctx.request.body
 *  const params = this.ctx.JoiVue('GetUserIdentity')
 *  if (!params) return
 */
'use strict'
module.exports = (app) => {
  const Joi = app.Joi
  return {
    // 登录
    Login: Joi.object().keys({
      account: Joi.string().required(),
      password: Joi.string().required()
    }),
    // 刷新Token
    RefreshToken: Joi.object().keys({
      account: Joi.string().required()
    }),
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
      search_txt: Joi.string().allow('')
    }),
    // 签名验证头部字段
    vueSign: Joi.object().keys({
      vue_signature: Joi.string().length(64).required(), // 请输入正确 signature
      vue_timestamp: Joi.string().length(10).required(), // 请输入正确 timestamp
      vue_nonce: Joi.string().length(16).required() // 请输入正确 nonce
    })
  }
}
