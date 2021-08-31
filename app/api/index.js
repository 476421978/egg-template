'use strict'
const axios = require('axios')
const qs = require('qs')
const fs = require('fs')

const GET = async (url, query) => {
  url += `?${qs.stringify(query)}`
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const POST = (url, data, token) => {
  if (token) url = url + token
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const WechatPayPost = (url, data, authorization) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          Authorization: authorization
        }
      })
      .then((res) => {
        resolve({
          status: res.status,
          ...res.body
        })
      })
      .catch((err) => {
        const fail = JSON.parse(JSON.stringify(err))
        reject(fail)
      })
  })
}

const API = {}
const apiPath = './'
fs.readdirSync(`${__dirname}/${apiPath}`)
  .filter((value) => {
    return value !== 'index.js' && value.indexOf('.js') > -1 // 过滤入口文件
  })
  .map((fileName) => {
    API[fileName.split('.js')[0]] = require(`${apiPath}/` + fileName)({ POST, GET, WechatPayPost })
    return fileName
  })

module.exports = API
