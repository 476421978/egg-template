'use strict'

const Controller = require('egg').Controller
// const fs = require('fs')
// const path = require('path')
class MinaIndexController extends Controller {
  // 解密用户信息
  async DecUserInfo() {
    const { ctx, service, app } = this
    const { config } = app
    const { wxUserInfo, jwtServer } = service
    const params = ctx.JoiMina('DecUserInfo')
    if (!params) return
    try {
      const res = await wxUserInfo.DecUserInfo(params)
      // 获取Token 有效期一小时
      const Token = jwtServer.createToken(res.id, config.minaJwt.secret)
      // 刷新Token 有效期一天
      const RefToken = jwtServer.createToken(res.id, config.minaJwt.secret, 86400)
      ctx.success({
        ...res,
        token: Token,
        refToken: RefToken
      })
    } catch (error) {
      ctx.fail(error)
    }
  }

  // 获取数据库 微信用户信息
  async GetWxUserInfo() {
    const { ctx, service } = this
    const { wxUserInfo } = service
    const params = ctx.JoiMina('GetWxUserInfo')
    if (!params) return
    try {
      const res = await wxUserInfo.findOne({
        id: ctx.minaUserId
      })
      ctx.success(res)
    } catch (error) {
      ctx.fail(error)
    }
  }

  // 获取小程序配置信息
  async GetMinaInfo() {
    const { ctx, service, app } = this
    const params = ctx.JoiMina('GetMinaInfo')
    if (!params) return
    try {
      // URL广告地址  滚动公告 图片地址 订阅消息
      ctx.success('静态数据')
    } catch (error) {
      ctx.fail(error)
    }
  }

  // 重新刷新token接口
  async RefreshToken() {
    const { ctx, app, service } = this
    const { config } = app
    const { jwtServer } = service
    const params = this.ctx.JoiMina('RefreshToken')
    if (!params) return
    try {
      const Token = jwtServer.createToken(ctx.minaUserId, config.minaJwt.secret)
      const RefToken = jwtServer.createToken(ctx.minaUserId, config.minaJwt.secret, 86400)

      ctx.success({
        token: Token,
        refToken: RefToken
      })
    } catch (error) {
      console.log('error-->>>', error)
      ctx.fail(error)
    }
  }

  // ======================= 用户 删 查 =======================

  // 删除订单
  async DeleteUser() {
    const { ctx, service } = this
    const { wxUserInfo } = service
    const params = this.ctx.JoiMina('deleteUser')
    if (!params) return
    try {
      const res = await wxUserInfo.destroy(params)
      ctx.success(res)
    } catch (error) {
      ctx.fail(error)
    }
  }

  // 获取订单列表
  async GetUserList() {
    const { ctx, service, app } = this
    const { wxUserInfo } = service
    const { Op } = app.Sequelize

    const params = this.ctx.JoiMina('getUserList')
    if (!params) return
    try {
      let paramWhere = {}

      // 搜索
      if (params.search_txt) {
        paramWhere.mobile = {
          [Op.like]: `${params.search_txt}%`
        }
      }

      // 默认
      const res = await wxUserInfo.findAndCountAll(paramWhere, {
        offset: (params.pages_size - 1) * params.pages_num,
        limit: params.pages_num
      })

      ctx.success(res)
    } catch (error) {
      ctx.fail(error)
    }
  }
}

module.exports = MinaIndexController
