'use strict'
module.exports = (app) => {
  const { Sequelize, model } = app
  const { STRING, INTEGER, DATE, UUIDV1 } = Sequelize
  const Model = model.define(
    'wx_pay_record',
    {
      id: {
        type: STRING.BINARY,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      // 订单流水号
      order_lsh: {
        type: STRING(128)
      },
      // 单价/吨
      pounds_price: {
        type: INTEGER(10)
      },
      // 计算应收 金额 单位分
      pay_price: {
        type: INTEGER(10),
        allowNull: false,
        defaultValue: 0
      },
      // ============= 小程序拉起支付所需字段
      // 时间戳
      time_stamp: {
        type: STRING(32)
      },
      // 随机字符串
      nonce_str: {
        type: STRING(32)
      },
      // 订单详情扩展字符串
      package: {
        type: STRING(128)
      },
      // 加密方式
      sign_type: {
        type: STRING(32),
        defaultValue: 'RSA'
      },
      // 签名
      pay_sign: {
        type: STRING(512)
      },
      // =============  支付结果字段
      // 商户订单号
      out_trade_no: {
        type: STRING(32)
      },
      // 微信支付订单号
      transaction_id: {
        type: STRING(32)
      },
      // 交易类型
      trade_type: {
        type: STRING(16)
      },
      // 交易状态
      trade_state: {
        type: STRING(32)
      },
      // 交易状态描述
      trade_state_desc: {
        type: STRING(16)
      },
      // 自定义数据
      attach: {
        type: STRING(255)
      },
      // 支付完成时间
      success_time: {
        type: DATE
      },
      // 实际支付金额 单位分
      payer_total: {
        type: INTEGER(10)
      },
      // 备注
      note: {
        type: STRING(64)
      }
    },
    {
      tableName: 'wx_pay_record'
    }
  )

  return Model
}
