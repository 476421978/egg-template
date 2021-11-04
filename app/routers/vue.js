'use strict'
module.exports = ({ router, controller, middleware }) => {
  const subRouter = router.namespace('/vue')
  const { post, get } = subRouter
  const { index } = controller.vue

  get('/vue_login', index.VueLogin)
  post('/vue_login', index.VueLogin)
}
