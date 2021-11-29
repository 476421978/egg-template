'use strict'
const Service = require('egg').Service
class VueRoleServer extends Service {
  // 构造函数
  constructor(props) {
    super(props)
    const { VueRole } = this.app.model
    // 常用配置
    this.state = {
      model: VueRole
    }
    props.request.commonServer(this)
  }

  // 登录
  async login(params) {
    const { ctx, app, service } = this
    const { VueRole } = service
    const user = await VueRole.findOne({
      account: params.account,
      password: params.password
    })
    return user
  }
}

module.exports = VueRoleServer
