'use strict'
/**
 * 系统权限角色表
 */
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, JSON, UUIDV1 } = Sequelize
  const VueRole = model.define(
    'vue_role',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      // 名称
      name: {
        type: STRING(32),
        allowNull: false,
        unique: true
      },
      // 角色编号
      code: {
        type: INTEGER(2),
        allowNull: false,
        defaultValue: 0
      },
      // 角色描述
      describe: {
        type: STRING(64)
      },
      // 开关 0关 1开
      open_flag: {
        type: INTEGER(1),
        defaultValue: 1
      },
      // 权限字符串数组 ['a','b']
      web_auth_arr: {
        type: JSON
      }
    },
    {
      freezeTableName: true,
      tableName: 'vue_role',
      timestamps: true,
      paranoid: true,
      // 只针对sequelize查询返回的字段下划线还是驼峰 保证mysql和查询返回的字段一致
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      // Sequelize 为模型提供了 underscored 参数. 设为 true 时,
      // 此参数会将所有属性的 field 参数设置为其名称的 snake_case 版本.
      //  这也适用于由关联和其他自动生成的字段自动生成的外键 【无效】
      underscored: true // 驼峰转下划线
    }
  )

  VueRole.associate = function () {
    // A.hasOne(B) 关联意味着 A 和 B 之间存在一对一的关系,外键在目标模型(B)中定义.
    // A.belongsTo(B)关联意味着 A 和 B 之间存在一对一的关系,外键在源模型中定义(A).
    // A.hasMany(B) 关联意味着 A 和 B 之间存在一对多关系,外键在目标模型(B)中定义.
    // 一个权限角色 对应 多个用户 （默认权限角色全部开放）
    VueRole.hasMany(model.VueUser, { foreignKey: 'vue_role_id' })
    model.VueUser.belongsTo(VueRole, { foreignKey: 'vue_role_id' })
  }

  return VueRole
}
