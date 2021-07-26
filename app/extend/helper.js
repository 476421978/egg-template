const CryptoJS = require('../utils/aes.js') //引用AES源码js
const key = CryptoJS.enc.Utf8.parse('0102030405060708') //十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse('0102030405060708') //十六位十六进制数作为秘钥偏移量

module.exports = {
  /**
   * aes 解密方法
   */
  AesDecrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  },
  /**
   * aes 加密方法
   */
  AesEncrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString().toUpperCase()
  },

  /**
   * base64 加密方法
   */
  Base64Encode(val) {
    let str = CryptoJS.enc.Utf8.parse(val)
    let base64 = CryptoJS.enc.Base64.stringify(str)
    return base64
  },

  /**
   * base64 解密方法
   */
  Base64Decode(val) {
    let words = CryptoJS.enc.Base64.parse(val)
    return words.toString(CryptoJS.enc.Utf8)
  }
}
