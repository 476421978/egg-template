'use strict'
const Service = require('egg').Service
class WxPayRecordServer extends Service {
  // 构造函数
  constructor(that) {
    super(that)
    const { WxPayRecord } = that.app.model
    // 常用配置
    this.state = {
      model: WxPayRecord
    }
    that.request.commonServer(this)
  }
}

module.exports = WxPayRecordServer
