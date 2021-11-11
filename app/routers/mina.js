'use strict'
module.exports = ({ router, controller, middleware }) => {
  const subRouter = router.namespace('/mina')
  const { post, get } = subRouter
  const { index } = controller.mina

  // 解密微信用户敏感信息
  post('/dec_user_info', index.DecUserInfo)
  // 获取数据库 微信用户信息
  post('/get_wx_user_info', index.GetWxUserInfo)
  // 获取小程序配置信息
  post('/get_mina_info', index.GetMinaInfo)
  // 刷新Token
  post('/refresh_token', index.RefreshToken)

  // ========== 用户信息管理接口
  post('/delete_user', index.DeleteUser)
  post('/get_user_list', index.GetUserList)
}
