'use strict'
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, DATE, UUIDV1 } = Sequelize

  const Model = model.define(
    'shopping_cart',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      // 总价格
      t_price: {
        type: INTEGER(2),
        allowNull: false,
        defaultValue: 0
      },
      // 总数量
      t_count: {
        type: INTEGER(2),
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: 'shopping_cart'
    }
  )

  // 在Model.associate()中定义所有关联,egg-sequelize将在所有模型加载后执行它
  Model.associate = function () {
    model.ShoppingCart.belongsTo(model.UserInfo)
    model.UserInfo.hasOne(model.ShoppingCart)
  }

  return Model
}
