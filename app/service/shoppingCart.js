'use strict'
const Service = require('egg').Service
class ShoppingCartServer extends Service {
  // 构造函数
  constructor(that) {
    super(that)
    const { ShoppingCart, UserInfo } = that.app.model
    // 常用配置
    const state = {
      model: ShoppingCart,
      include: [
        {
          model: UserInfo
        }
      ],
      order: [['created_at', 'DESC']]
    }
    return that.request.commonServer(state)
  }
}

module.exports = ShoppingCartServer
