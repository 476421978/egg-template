'use strict'
module.exports = ({ router, controller, middleware }) => {
  const subRouter = router.namespace('/common')
  const { post, get } = subRouter
  const { common } = controller

  post('/upload', common.Upload)
}
