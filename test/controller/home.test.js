'use strict'
const { app, mock, assert } = require('egg-mock/bootstrap')

describe('test/controller/home.test.js', () => {
  it('should get a ctx', async () => {
    const ctx = app.mockContext()
    const res = await ctx.helper.WechatPayPost()
    console.log('xxx-->>>', res)
    // assert(ctx.method === 'GET')
    // assert(ctx.url === '/')
  })
})
