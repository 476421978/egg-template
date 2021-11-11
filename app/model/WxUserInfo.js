/**
 * 微信用户信息表
 * appid:微信小程序的唯一标识符
 * openid:在这个微信小程序里面，这个用户的唯一标识符
 * UnionId是标识用户在一个开放平台中的唯一性的
 */
'use strict'
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, DATE, UUIDV1 } = Sequelize

  const Model = model.define(
    'wx_user_info',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      // 手机号
      mobile: {
        type: STRING(12)
      },
      // 管理员权限
      mina_auth: {
        type: INTEGER(1),
        defaultValue: 0
      },
      // 微信app_id
      mina_app_id: {
        type: STRING(124)
      },
      // 微信open_id
      mina_open_id: {
        type: STRING(124)
      },
      // 微信unionId
      mina_union_id: {
        type: STRING(124)
      },
      // 微信名称
      nick_name: {
        type: STRING(50),
        allowNull: false,
        defaultValue: '微信用户'
      },
      // 微信头像
      chat_head: {
        type: STRING(255)
      },
      // 性别 1 2
      gender: {
        type: Sequelize.STRING(1)
      },
      // 城市
      city: {
        type: Sequelize.STRING(20)
      },
      // 省份
      province: {
        type: Sequelize.STRING(20)
      },
      // 国家
      country: {
        type: Sequelize.STRING(20)
      },
      // 语言
      language: {
        type: Sequelize.STRING(20)
      }
    },
    {
      tableName: 'wx_user_info'
    }
  )
  return Model
}
