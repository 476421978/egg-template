'use strict'
const Service = require('egg').Service
class VueUserServer extends Service {
  // 构造函数
  constructor(props) {
    super(props)
    const { VueUser } = this.app.model
    // 常用配置
    this.state = {
      model: VueUser
    }
    props.request.commonServer(this)
  }

  // 自定义方法
  async findOtherOne() {
    return '123'
  }
}

module.exports = VueUserServer
