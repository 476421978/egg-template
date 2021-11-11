'use strict'
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, UUIDV1 } = Sequelize
  const Model = model.define(
    'mina_token',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      app_name: {
        type: STRING(50)
      },
      access_token: {
        type: STRING(1024)
      },
      expires_in: {
        type: INTEGER(10),
        allowNull: false,
        defaultValue: 7200
      }
    },
    {
      tableName: 'mina_token'
    }
  )
  return Model
}
