'use strict'
const Service = require('egg').Service
class IndexDemoServer extends Service {
  // 构造函数
  constructor(props) {
    super(props)
    // const { Model } = this.app.model
    // 常用配置
    this.state = {
      // model: Model
    }
    props.request.commonServer(this)
  }
}

module.exports = IndexDemoServer
