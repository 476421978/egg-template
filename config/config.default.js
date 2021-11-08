/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    joi: {
      options: {},
      locale: {
        'zh-cn': {}
      },
      throw: true, // throw immediately when capture exception
      throwHandle: (error) => {
        return error
      }, // error message format when throw is true
      errorHandle: (error) => {
        return error
      }, // error message format when throw is false
      resultHandle: (result) => {
        return result
      }
    }
  })

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1626837537627_1137'

  // add your middleware config here
  // 开启全局中间件
  config.middleware = ['vueTokenCheck']
  // 指定匹配路由
  config.vueTokenCheck = {
    match: ['/vue']
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    minaJwt: {
      secret: 'S_MINA_TOKEN_2021'
    },
    vueJwt: {
      secret: 'VUE_TOKEN_2021',
      secretRef: 'VUE_TOKEN_2021_REFRESH'
    },
    wechatInfo: require('./lib/wechatInfo.js')
  }

  // csrf 安全
  config.security = {
    csrf: {
      enable: false
    }
  }

  // 可跨域类型
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'egg_template',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    timezone: '+08:00', // 使用东八区 慢几小时就加几小时，快则减
    define: {
      // 使用自己配置的表名，避免sequelize自动将表名转换为复数
      freezeTableName: true,
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      underscored: true,
      // 默认创造created_at updated_at 时间字段
      timestamps: true,
      // Sequelize 支持 paranoid 表的概念.
      // 一个 paranoid 表是一个被告知删除记录时不会真正删除它的表.
      // 反而一个名为 deletedAt 的特殊列会将其值设置为该删除请求的时间戳
      paranoid: true
    }
  }

  return {
    ...config,
    ...userConfig
  }
}
