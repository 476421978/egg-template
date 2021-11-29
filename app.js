'use strict'

module.exports = (app) => {
  app.beforeStart(async () => {
    console.log('Before app start...', app.config.env)
    if (app.config.env === 'local' || app.config.env === 'unittest') {
      // await app.model.sync({ force: true }) // 删除重建
      // await app.model.sync({ alter: true }) // 较数据库表和模型 修改数据库表匹配模型
      // await app.model.sync() // 同步模型到数据库，存在则不操作，不存在则创建
      console.log('Models has been sync done....')
    }
  })

  app.once('server', (server) => {
    // websocket
    // server: 该事件一个 worker 进程只会触发一次，在 HTTP 服务完成启动后，会将 HTTP server 通过这个事件暴露出来给开发者。
  })

  app.on('error', (err, ctx) => {
    // report error
    err && console.log('err: ' + err)
  })

  app.on('request', (ctx) => {
    // log receive request
    // console.log('接受到请求: ' + ctx)
  })

  app.on('response', (ctx) => {
    // ctx.starttime is set by framework
    // const used = Date.now() - ctx.starttime;
    // log total cost
    // console.log(used)
  })
}
