'use strict'
/**
 * 系统身份用户表
 */
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, DATE, UUIDV1 } = Sequelize
  const Model = model.define(
    'vue_user',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      // account
      account: {
        type: STRING(32),
        allowNull: false,
        unique: true
      },
      password: {
        type: STRING
      }
    },
    {
      freezeTableName: true,
      tableName: 'vue_user',
      timestamps: true,
      paranoid: true
      // underscored: true // 驼峰转下划线 只针对created_at...三个
    }
  )

  Model.associate = function () {}

  return Model
}
