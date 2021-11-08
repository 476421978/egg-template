'use strict'
module.exports = ({ router, controller, middleware }) => {
  const subRouter = router.namespace('/vue')
  const { post, get } = subRouter
  const { index } = controller.vue

  // 登录
  get('/vue_login', index.VueLogin)
  post('/vue_login', index.VueLogin)

  // 静态资源接口
  post('/get_static_data', index.GetStaticData)

  // ========== 用户信息管理接口
  post('/create_user', index.CreateUser)
  post('/delete_user', index.DeleteUser)
  post('/update_user', index.UpdateUser)
  post('/get_user', index.GetUser)
  post('/get_user_list', index.GetUserList)
}
