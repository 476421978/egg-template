'use strict'
const { app, mock, assert } = require('egg-mock/bootstrap')
describe('test/controller/home.test.js', () => {
  it('should get a ctx', () => {
    console.log('进来测试啦')
    const ctx = app.mockContext()
    assert(ctx.method === 'GET')
    assert(ctx.url === '/')
  })
})
