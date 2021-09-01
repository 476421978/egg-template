'use strict'
const { app, mock, assert } = require('egg-mock/bootstrap')

describe('test/controller/home.test.js', () => {
  // 测试扩展方法
  // it('should get a ctx', async () => {
  //   const ctx = app.mockContext()
  //   const res = await ctx.helper.WechatPayPost()
  //   console.log('xxx-->>>', res)
  //   // assert(ctx.method === 'GET')
  //   // assert(ctx.url === '/')
  // })

  // 测试文件上传
  it('should post upload', async () => {
    app.mockCsrf()
    return app.httpRequest()
      .post('/home/upload')
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'my') // 表单数据
      .attach('file', `test/public/image1.jpeg`)
      .expect(200)
  })
})
