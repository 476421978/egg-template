'use strict'

const Controller = require('egg').Controller
// const fs = require('fs')
// const path = require('path')
class Vue3IndexController extends Controller {
  // login
  async VueLogin() {
    const { ctx, app } = this
    try {
      ctx.success('登陆成功')
    } catch (error) {
      ctx.fail(error)
    }
  }
}

module.exports = Vue3IndexController
