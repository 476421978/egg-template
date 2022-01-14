'use strict'
/**
 * 系统身份用户表
 */
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, DATE, UUIDV1 } = Sequelize
  const VueUser = model.define(
    'vue_user',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      account: {
        type: STRING(32),
        allowNull: false,
        unique: true
      },
      password: {
        type: STRING
      },
      sex: {
        // 0 女 1男
        type: INTEGER(1),
        defaultValue: 1
      },
      last_time: {
        // 记录最后一次登录时间
        type: DATE
      }
    },
    {
      freezeTableName: true,
      tableName: 'vue_user',
      timestamps: true,
      paranoid: true,
      // 只针对sequelize查询返回的字段下划线还是驼峰
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true // 驼峰转下划线
    }
  )

  VueUser.associate = function () {}

  return VueUser
}
