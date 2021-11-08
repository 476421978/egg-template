'use strict'
module.exports = {
  // 使用 app 对象 挂载this层
  commonServer(self) {
    const defaultModel = self.state.model
    const defaultInclude = self.state.include
    const defaultOrder = self.state.order
    /** 基本的 增删改查 */
    // ======================== 增 ========================
    self.create = (val) => {
      return defaultModel.create(val)
    }
    // ======================== 删 ========================
    self.destroy = (Where = {}) => {
      return defaultModel.destroy({
        where: Where
      })
    }
    // // ======================== 改 ========================
    self.update = (val, Where = {}) => {
      return defaultModel.update(val, {
        where: Where
      })
    }
    // // ======================== 查 ========================
    self.findOne = (Where = {}, args = {}, Include = [], Order = []) => {
      const params = {
        where: Where,
        include: Include.length ? Include : defaultInclude,
        order: Order.length ? Order : defaultOrder,
        ...args
      }
      return defaultModel.findOne(params)
    }
    self.findAll = (Where = {}, args = {}, Include = [], Order = []) => {
      const params = {
        where: Where,
        include: Include.length ? Include : defaultInclude,
        order: Order.length ? Order : defaultOrder,
        ...args
      }
      return defaultModel.findAll(params)
    }
    // 方法使用提供的主键从表中仅获得一个条目
    self.findByPk = (val) => {
      return defaultModel.findByPk(val)
    }
    // 分页
    self.findAndCountAll = (Where = {}, args = { offset: 0, limit: 10 }, Include = [], Order = []) => {
      const params = {
        where: Where,
        include: Include.length ? Include : defaultInclude,
        order: Order.length ? Order : defaultOrder,
        ...args
      }
      return defaultModel.findAndCountAll(params)
    }
    // // 查到返回，查不到创建 // Defaults自定义创建字段
    self.findOrCreate = async (Where = {}, Defaults = {}) => {
      const res = await defaultModel.findOrCreate({
        where: Where,
        defaults: Defaults,
        raw: true
      })
      // 存在则返回数据即可
      if (res && res.length > 1) return res[0]
      return res
    }
    // 方法仅计算数据库中元素出现的次数. 还有max, min 和 sum
    self.count = (Where = {}) => {
      return defaultModel.count({
        where: Where
      })
    }
  }
}
