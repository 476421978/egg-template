const fs = require('fs')

// 小程序配置信息
const appId = 'wxc35c9f58638297a1'
const appScripts = 'a9fabaa2c6e199903d1d03130e3d85df'

const mchId = '1613091228'
const api = 'W7YyuSeSSwipkK06zgFo8KNOipxoS2HX'
const ipv3 = '3ogQKpy1kXzLEDltkK70s8V8CWGMePMq'
// const pfx = fs.readFileSync(__dirname + '/apiclient_cert.p12')

// 订阅消息
const subNews = [
  {
    name: '支付成功订阅消息',
    id: 'GrFcNqRRLiOvyNRajUGcoDKyXUW9CvVJt4EqEgEmgHU',
    mina_auth: 0
  }
]

// 订阅消息模版
const subNewsModel = [
  {
    template_id: 'GrFcNqRRLiOvyNRajUGcoDKyXUW9CvVJt4EqEgEmgHU'
  },
  {
    template_id: 'speE9lCdtsPgj3fd5NJb3oDBgGtVtcc1F_52tx7LlfU'
  }
]

module.exports = {
  api,
  ipv3,
  appId,
  appScripts,
  mchId,
  subNews,
  subNewsModel
}
