'use strict'
module.exports = {
  // 通用成功接口
  success(param) {
    this.body = {
      code: 200,
      result: param
    }
  },
  // 通用代码逻辑错误
  fail(param) {
    this.body = {
      code: 400,
      result: param
    }
  },
  // 通用参数错误
  failParams(param) {
    this.body = {
      code: 416,
      result: param
    }
  },
  // 无权限错误
  noAccess(param) {
    this.body = {
      code: 403,
      result: param
    }
  },
  // 请求头错误
  headErr(param) {
    this.body = {
      code: 412,
      result: param
    }
  },
  // token 过期
  tokenExpErr(param) {
    this.body = {
      code: 4001,
      result: param
    }
  },
  // common
  JoiCom(val) {
    return this.validate(this.app.validator.commonVfy[val](this.request.body)).value
  },
  // vue
  JoiVue(val) {
    return this.validate(this.app.validator.vueVfy[val](this.request.body)).value
  }
}
