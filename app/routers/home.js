module.exports = ({ router, controller, middleware }) => {
  const subRouter = router.namespace('/home')
  const { post, get } = subRouter
  const { home } = controller
  post('/', home.Index)
  post('/login', home.Login)
  post('/get_joi', home.GetJoi)
}
