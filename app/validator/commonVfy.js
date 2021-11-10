/**
 *  使用方法 默认ctx.request.body
 *  const params = this.ctx.JoiValidate('GetUserIdentity')
 *  if (!params) return
 */
'use strict'
module.exports = (app) => {
  const Joi = app.Joi
  return {
    // 获取用户身份信息
    GetUserIdentity: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    })
  }
}
