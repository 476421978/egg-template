'use strict'
/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// }

exports.joi = {
  enable: true,
  package: 'egg-joi'
}

exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus'
}

// 签发token
exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}
