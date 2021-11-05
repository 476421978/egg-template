'use strict'

const Controller = require('egg').Controller
// const fs = require('fs')
// const path = require('path')
class Vue3IndexController extends Controller {
  // login
  async VueLogin() {
    const { ctx, app, service } = this
    const { jwt, config } = app
    const { jwtServer } = service
    try {
      const params = this.ctx.JoiVue('Login')

      // const res = await

      const Token = jwtServer.createToken(params.account)

      // const RefToken = jwt.sign(
      //   {
      //     user_id_ref: 'vue3Ref'
      //   },
      //   config.signInfo.vueJwtSecretRef,
      //   {
      //     expiresIn: '24h'
      //   }
      // )

      ctx.success({
        ...params,
        web_auth_arr: ['home'],
        token: Token,
        refToken: RefToken
      })
    } catch (error) {
      console.log('error-->>', error)
      ctx.fail(error)
    }
  }

  // 重新刷新token接口
  async UpdateToken() {
    const { ctx } = this
    const Token = jwt.sign(
      {
        account: 'vue3'
      },
      app.config.signInfo.vueJwtSecret,
      {
        expiresIn: '1h'
      }
    )

    const RefToken = jwt.sign(
      {
        account: 'vue3Ref'
      },
      app.config.signInfo.vueJwtSecretRef,
      {
        expiresIn: '24h'
      }
    )

    ctx.success({
      token: Token,
      refToken: RefToken
    })
  }

  // 获取静态数据
  async GetStaticData() {
    const { ctx } = this
    ctx.success('静态数据')
  }

  // ======================= 用户 增删改查 =======================
  async CreateUser() {
    const { ctx, service } = this
    const { vueUser } = service
    const params = ctx.JoiVue('createUser')
    if (!params) return
    try {
      const res = await vueUser.create(params)
      ctx.success(res)
    } catch (error) {
      ctx.fail(error)
    }
  }

  async DeleteUser() {
    const { ctx, app, service } = this
    const { vueUser } = service
    const params = this.ctx.JoiVue('deleteUser')
    if (!params) return
    try {
      const res = await vueUser.destroy(params)
      ctx.success(res)
    } catch (error) {
      ctx.fail(error)
    }
  }

  async UpdateUser() {
    const { ctx, service } = this
    const { vueUser } = service
    const params = this.ctx.JoiVue('updateUser')
    console.log('params-->>', params)
    if (!params) return
    try {
      const res = await vueUser.update(params, {
        account: '15014635129'
      })
      ctx.success(res)
    } catch (error) {
      ctx.fail(error)
    }
  }

  async GetUser() {
    const { ctx, service } = this
    const { jwtServer } = service
    const params = this.ctx.JoiVue('getUser')
    if (!params) return
    try {
      const res = await vueUser.findOne(params)
      ctx.success(res)
    } catch (error) {}
  }
}

module.exports = Vue3IndexController
