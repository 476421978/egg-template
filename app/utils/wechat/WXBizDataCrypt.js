const crypto = require('crypto')

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // 转换base64 decode
  // 使用Buffer.alloc() 、Buffer.allocUnsafe() 、Buffer.from（） 来替代 new Buffer()
  const sessionKey = Buffer.from(this.sessionKey, 'base64')
  encryptedData = Buffer.from(encryptedData, 'base64')
  iv = Buffer.from(iv, 'base64')
  try {
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)
  } catch (err) {
    throw '解密失败，请重试'
  }
  if (decoded.watermark.appid !== this.appId) {
    throw 'appId不符合，请检查'
  }
  return decoded
}

module.exports = WXBizDataCrypt
