'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  // 登录签发token
  async Login() {
    const { ctx, app } = this
    const { jwt } = app
    try {
      const minaToken = jwt.sign(
        {
          account: 'mina',
        },
        app.config.signInfo.minaSecretTitle,
        {
          expiresIn: '24h',
        }
      )
      ctx.success(minaToken)
    } catch (error) {
      ctx.fail(error)
    }
  }
}

module.exports = HomeController
