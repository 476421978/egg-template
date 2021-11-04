/**
 *  使用方法
 *  const params = this.ctx.JoiVue('GetUserIdentity')
 *  if (!params) return
 */
'use strict'
module.exports = (app) => {
  const Joi = app.Joi
  return {
    // 获取用户身份信息
    Login: (body) => {
      return Joi.object(body).keys({
        account: Joi.string().required(),
        password: Joi.string().required()
      })
    }
  }
}
