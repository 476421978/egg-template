'use strict'
const Service = require('egg').Service
class RelationGoodsCartServer extends Service {
  // 构造函数
  constructor(that) {
    super(that)
    const { RelationGoodsCart } = that.app.model
    // 常用配置
    const state = {
      model: RelationGoodsCart
    }
    return that.request.commonServer(state)
  }
}

module.exports = RelationGoodsCartServer
