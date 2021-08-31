'use strict'
module.exports = {
  // 通用成功接口
  success(param) {
    this.body = {
      code: 200,
      result: param,
    }
  },
  // 通用代码逻辑错误
  fail(param) {
    this.body = {
      code: 500,
      result: param,
    }
  },
  // 通用参数错误
  failParams(param) {
    this.body = {
      code: 400,
      result: param,
    }
  },
  // 无权限错误
  noAccess(param) {
    this.body = {
      code: 403,
      result: param,
    }
  },
  // egg-joi
  JoiValidate(val) {
    try {
      return this.validate(this.app.validator.index[val](this.request.body)).value
    } catch (error) {
      this.failParams(error)
      return false
    }
  },
}
