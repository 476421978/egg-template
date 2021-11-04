'use strict'

const Controller = require('egg').Controller
// const fs = require('fs')
// const path = require('path')
class Vue3IndexController extends Controller {
  // login
  async VueLogin() {
    const { ctx, app } = this
    try {
      const params = this.ctx.JoiVue('Login')
      ctx.success({
        ...params,
        web_auth_arr: ['home']
      })
    } catch (error) {
      ctx.fail(error)
    }
  }
}

module.exports = Vue3IndexController
