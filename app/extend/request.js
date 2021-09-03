'use strict'
module.exports = {
  // 使用 app 对象
  commonServer(state) {
    const defaultModel = state.model
    const defaultInclude = state.include
    const defaultOrder = state.order
    return {
      /** 基本的 增删改查 */
      // ======================== 增 ========================
      async create(val) {
        return defaultModel.create(val)
      },
      // ======================== 删 ========================
      async destroy(Where = {}) {
        return defaultModel.destroy({
          where: Where
        })
      },
      // ======================== 改 ========================
      async update(val, Where = {}) {
        return defaultModel.update(val, {
          where: Where
        })
      },
      // ======================== 查 ========================
      async findOne(Where = {}, Include = [], Order = [], args = {}) {
        const params = {
          where: Where,
          include: Include.length ? Include : defaultInclude,
          order: Order.length ? Order : defaultOrder,
          ...args
        }
        return defaultModel.findOne(params)
      },
      async findAll(Where = {}, Include = [], Order = [], args = {}) {
        const params = {
          where: Where,
          include: Include.length ? Include : defaultInclude,
          order: Order.length ? Order : defaultOrder,
          ...args
        }
        return defaultModel.findAll(params)
      },
      // 方法使用提供的主键从表中仅获得一个条目
      async findByPk(val) {
        return defaultModel.findByPk(val)
      },
      // 分页
      async findAndCountAll(Where = {}, Include = [], Order = [], args = { Offset: 0, limit: 10 }) {
        const params = {
          where: Where,
          include: Include.length ? Include : defaultInclude,
          order: Order.length ? Order : defaultOrder,
          ...args
        }
        return defaultModel.findAndCountAll(params)
      },
      // 查到返回，查不到创建 // Defaults自定义创建字段
      async findOrCreate(Where = {}, Defaults = {}) {
        return defaultModel.findOrCreate({
          where: Where,
          defaults: Defaults
        })
      },
      // 方法仅计算数据库中元素出现的次数. 还有max, min 和 sum
      async count(Where = {}) {
        return defaultModel.count({
          where: Where
        })
      }
    }
  }
}
