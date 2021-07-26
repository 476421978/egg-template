'use strict'
const path = require('path')
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
  config.keys = appInfo.name + '_1626837537627_8888'

  // add your middleware config here
  // 开启全局中间件
  config.middleware = ['bodyAes']

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    signInfo: {
      minaSecretTitle: 'S_MINA_TOKEN_2021'
    }
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'sys'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'sys',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456'
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
  }

  config.logger = {
    level: 'INFO', // 避免记录数据库执行语句
    dir: path.join(__dirname, '../logs/prod'), // 保存路径为工程路径下`logs/prod/app`
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
    outputJSON: true
  }

  return {
    ...config,
    ...userConfig
  }
}
