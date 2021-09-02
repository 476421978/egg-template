'use strict'
const Service = require('egg').Service
class GoodsServer extends Service {
  // 构造函数
  constructor(props) {
    super(props)
    const { Goods } = this.app.model
    // 常用配置
    this.state = {
      model: Goods
    }
    props.request.commonServer(this)
  }
}

module.exports = GoodsServer
