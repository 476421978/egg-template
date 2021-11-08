'use strict'

const Controller = require('egg').Controller
const fs = require('fs')
const path = require('path')
class HomeController extends Controller {
  // 登录签发token
  async Login() {
    const { ctx, app } = this
    const { jwt } = app
    try {
      const minaToken = jwt.sign(
        {
          account: 'mina'
        },
        app.config.minaJwt.secret,
        {
          expiresIn: '24h'
        }
      )
      ctx.success(minaToken)
    } catch (error) {
      ctx.fail(error)
    }
  }

  // 上传文件
  async Upload() {
    const stream = await this.ctx.getFileStream()
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase()
    const target = path.join(this.config.baseDir, '/public', filename)
    const writeStream = fs.createWriteStream(target)
    // 当使用标准的source.pipe(dest),如果dest出现了error,source不会被销毁
    // 而且你无法提供一个回调当pipe被销毁了。pump就是解决上面的两个问题的
    await pump(stream, writeStream)
    this.ctx.success('成功')
  }
}

module.exports = HomeController
