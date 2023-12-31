'use strict'
const Service = require('egg').Service
class VueUserServer extends Service {
  // 构造函数
  constructor(props) {
    super(props)
    const { VueUser, VueRole } = this.app.model
    // 常用配置
    this.state = {
      model: VueUser,
      include: [
        // 关联权限表
        {
          model: VueRole
        }
      ]
    }
    props.request.commonServer(this)
  }

  // 登录
  async login(params) {
    const { ctx, app, service } = this
    const { vueUser } = service
    const user = await vueUser.findOne({
      account: params.account,
      password: params.password
    })
    return user
  }
}

module.exports = VueUserServer
