'use strict'
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, DATE, UUIDV1 } = Sequelize

  const Model = model.define(
    'user_info',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      // 姓名
      name: {
        type: STRING(10),
        allowNull: false,
        defaultValue: '默认姓名'
      },
      // 年龄
      age: {
        type: INTEGER(3),
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: 'user_info'
    }
  )

  // 在Model.associate()中定义所有关联,egg-sequelize将在所有模型加载后执行它
  Model.associate = function () {
    // model.XXX.belongsTo(model.YYY)
    // model.YYY.hasOne(model.XXX)
  }

  return Model
}
