/**
 *  使用方法
 *  const params = this.ctx.JoiVue('GetUserIdentity')
 *  if (!params) return
 */
'use strict'
module.exports = (app) => {
  const Joi = app.Joi
  try {
    return {
      // 登录
      Login: (body) => {
        return Joi.object(body).keys({
          account: Joi.string().required(),
          password: Joi.string().required()
        })
      },
      // 创建用户
      createUser: (body) => {
        return Joi.object(body).keys({
          account: Joi.string().required(),
          password: Joi.string().required()
        })
      },
      // 删除用户
      deleteUser: (body) => {
        return Joi.object(body).keys({
          account: Joi.string()
        })
      },
      // 更新用户
      updateUser: (body) => {
        return Joi.object(body).keys({
          password: Joi.string()
        })
      },
      // 查询用户
      getUser: (body) => {
        return Joi.object(body).keys({
          account: Joi.string()
        })
      },
      // 获取用户列表
      getUserList: (body) => {
        return Joi.object(body).keys({
          pages_size: Joi.number(),
          pages_num: Joi.number(),
          search_txt: Joi.string().allow('')
        })
      }
    }
  } catch (error) {
    this.ctx.failParams(error)
    return false
  }
}
