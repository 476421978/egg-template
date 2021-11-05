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
  config.keys = appInfo.name + '_1626837537627_6666'

  config.logger = {
    level: 'WARN', // 避免记录数据库执行语句
    dir: path.join(__dirname, '../logs/dev'), // 保存路径为工程路径下`logs/prod/app`
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
    outputJSON: true
  }

  return {
    ...config
  }
}
