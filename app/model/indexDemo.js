'use strict'
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, DATE, UUIDV1 } = Sequelize
  const Model = model.define(
    'goods',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      // 名称
      name: {
        type: STRING(10),
        allowNull: false,
        defaultValue: '默认水果'
      },
      // 价格
      price: {
        type: INTEGER(10),
        allowNull: false,
        defaultValue: 1
      },
      // 数量
      count: {
        type: INTEGER(10),
        allowNull: false,
        defaultValue: 10
      }
    },
    {
      tableName: 'goods'
    }
  )

  // 在Model.associate()中定义所有关联,egg-sequelize将在所有模型加载后执行它
  Model.associate = function () {
    // model.XXX.belongsTo(model.YYY)
    // model.YYY.hasOne(model.XXX)
  }

  return Model
}
