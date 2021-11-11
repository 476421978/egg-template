'use strict'
const Service = require('egg').Service
class MinaTokenServer extends Service {
  // 构造函数
  constructor(that) {
    super(that)
    const { MinaToken } = that.app.model
    // 常用配置
    this.state = {
      model: MinaToken
    }
    that.request.commonServer(this)
  }
}

module.exports = MinaTokenServer
