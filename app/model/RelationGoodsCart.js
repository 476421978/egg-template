'use strict'
/**
 * 商品 购物车 关系表
 */
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, UUIDV1 } = Sequelize
  const Model = model.define(
    'relation_goods_cart',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      // 数量
      goods_count: {
        type: INTEGER(2),
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: 'relation_goods_cart'
    }
  )

  // 在Model.associate()中定义所有关联,egg-sequelize将在所有模型加载后执行它
  Model.associate = function () {
    model.RelationGoodsCart.belongsTo(model.ShoppingCart)
    model.ShoppingCart.hasMany(model.RelationGoodsCart)

    model.RelationGoodsCart.belongsTo(model.Goods)
    model.Goods.hasMany(model.RelationGoodsCart)
  }

  return Model
}
