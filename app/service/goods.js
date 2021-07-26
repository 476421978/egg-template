'use strict'
const Service = require('egg').Service
class GoodsServer extends Service {
  // 构造函数
  constructor(that) {
    super(that)
    const { Goods } = that.app.model
    // 常用配置
    const state = {
      model: Goods
    }
    return that.request.commonServer(state)
  }
}

module.exports = GoodsServer
