'use strict';
module.exports = ({ router, controller, middleware }) => {
  const subRouter = router.namespace('/home');
  const { post, get } = subRouter;
  const { home } = controller;
  post('/login', home.Login);
};
