module.exports = (app) => {
  const Joi = app.Joi
  return {
    // 获取用户身份信息
    GetUserIdentity: (body) => {
      return Joi.object(body).keys({
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      })
    }
  }
}
