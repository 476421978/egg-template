'use strict'
const { app, mock, assert } = require('egg-mock/bootstrap')
const fs = require('fs')
describe('test/controller/home.test.js', () => {
  // 测试扩展方法
  // it('should get a ctx', async () => {
  //   const ctx = app.mockContext()
  //   // 需要上传.pem文件到public
  //   const { appId, mchId } = app.config.wechatInfo
  //   const payConfig = new ctx.helper.WechatPay({
  //     appId: appId,
  //     mchId: mchId,
  //     publicKey: fs.readFileSync(`public/apiclient_cert.pem`),
  //     privateKey: fs.readFileSync(`public/apiclient_key.pem`)
  //   })
  //   const wechatPay = await payConfig.WechatPayPost({
  //     openId: '789',
  //     description: '描述',
  //     attach: '自定义数据',
  //     total: 1,
  //     notifyUrl: 'https://www.googlle.com'
  //   })
  //   console.log('wechatPay--->>>', wechatPay)
  // })

  // 测试文件上传
  // it('should post upload', async () => {
  //   app.mockCsrf()
  //   return app
  //     .httpRequest()
  //     .post('/common/upload')
  //     .set('Content-Type', 'multipart/form-data')
  //     .field('name', 'my') // 表单数据
  //     .attach('file', `test/public/image1.jpeg`)
  //     .expect(200)
  // })

  // 解密小程序用户/手机号信息
  it('should post decData', async () => {
    const ctx = app.mockContext()
    const result = await ctx.helper.WechatDecryptInfo('123', '123', '123')
    console.log('result-->>', result)
  })
})
