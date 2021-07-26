'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
const fs = require('fs')
module.exports = (app) => {
  fs.readdirSync(`${__dirname}/routers`).map((value) => require('./routers/' + value)(app))
}
