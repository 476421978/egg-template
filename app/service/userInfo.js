'use strict'
const Service = require('egg').Service
class UserInfoServer extends Service {
  // 构造函数
  constructor(that) {
    super(that)
    const { UserInfo } = that.app.model
    // 常用配置
    const state = {
      model: UserInfo
    }
    return that.request.commonServer(state)
  }
}

module.exports = UserInfoServer
