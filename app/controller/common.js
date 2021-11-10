'use strict'

const Controller = require('egg').Controller
const fs = require('fs')
const path = require('path')
const pump = require('mz-modules/pump')
class HomeController extends Controller {
  // 上传文件
  async Upload() {
    const stream = await this.ctx.getFileStream()
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase()
    const target = path.join(this.config.baseDir, 'app/public', filename)
    const writeStream = fs.createWriteStream(target)
    // 当使用标准的source.pipe(dest),如果dest出现了error,source不会被销毁
    // 而且你无法提供一个回调当pipe被销毁了。pump就是解决上面的两个问题的
    await pump(stream, writeStream)
    this.ctx.success('成功')
  }
}

module.exports = HomeController
