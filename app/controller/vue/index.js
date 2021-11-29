'use strict'

const Controller = require('egg').Controller
// const fs = require('fs')
// const path = require('path')
class Vue3IndexController extends Controller {
  // login
  async VueLogin() {
    const { ctx, app, service } = this
    const { config } = app
    const { jwtServer, vueUser } = service
    const params = this.ctx.JoiVue('Login')
    if (!params) return

    try {
      const user = await vueUser.login(params)
      if (!user) throw '找不到用户'

      const Token = jwtServer.createToken(user.id, config.vueJwt.secret)
      const RefToken = jwtServer.createToken(user.id, config.vueJwt.secret, 86400)

      ctx.success({
        ...user.dataValues,
        token: Token,
        refToken: RefToken
      })
    } catch (error) {
      ctx.fail(error)
    }
  }

  // 重新刷新token接口
  async RefreshToken() {
    const { ctx, app, service } = this
    const { config } = app
    const { jwtServer, vueUser } = service
    const params = this.ctx.JoiVue('RefreshToken')

    if (!params) return
    try {
      const user = await vueUser.findOne({ account: params.account })
      if (!user) throw '找不到用户'

      const Token = jwtServer.createToken(user.id, config.vueJwt.secret)
      const RefToken = jwtServer.createToken(user.id, config.vueJwt.secret, 86400)

      ctx.success({
        token: Token,
        refToken: RefToken
      })
    } catch (error) {
      ctx.fail(error)
    }
  }

  // 获取静态数据
  async GetStaticData() {
    const { ctx } = this
    const userId = ctx.vueUserId
    ctx.success(`静态数据UserId:${userId}`)
  }

  // ======================= 用户 增删改查 =======================
  async CreateUser() {
    const { ctx, service } = this
    const { vueUser } = service
    const params = ctx.JoiVue('createUser')
    if (!params) return
    try {
      const user = await vueUser.count({
        account: params.account
      })
      if (user) throw '账号已存在'

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
    const { vueUser } = service
    const params = this.ctx.JoiVue('getUser')
    if (!params) return
    try {
      const res = await vueUser.findOne(params)
      ctx.success(res)
    } catch (error) {}
  }

  async GetUserList() {
    const { ctx, service, app } = this
    const { vueUser } = service
    const { Op } = app.Sequelize

    const params = this.ctx.JoiVue('getUserList')
    if (!params) return

    try {
      let whereInfo = {}
      if (params.search_txt) {
        whereInfo.account = {
          [Op.like]: `%${params.search_txt}%`
        }
      }
      const res = await vueUser.findAndCountAll(whereInfo, {
        offset: (params.pages_size - 1) * params.pages_num,
        limit: params.pages_num
      })

      ctx.success(res)
    } catch (error) {}
  }
}

module.exports = Vue3IndexController
