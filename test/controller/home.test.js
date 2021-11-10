'use strict'
const { app, mock, assert } = require('egg-mock/bootstrap')
const fs = require('fs')
describe('test/controller/home.test.js', () => {
  // 测试文件上传
  it('should post upload', async () => {
    app.mockCsrf()
    return app
      .httpRequest()
      .post('/common/upload')
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'my2') // 表单数据
      .attach('file', `test/public/image1.jpeg`)
      .expect(200)
  })
})
