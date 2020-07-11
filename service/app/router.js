'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const isLogin = app.middleware.isLogin()
  // router.get('/', controller.home.index);

  router.post('/client/user/register', controller.user.register);
  router.post('/client/user/login', controller.user.login);
  router.post('/client/user/logout', controller.user.logout);
  router.post('/client/user/getUserInfo', isLogin, controller.user.getUserInfo);

  router.get('/client/tag/findList', controller.tag.findList);
  router.post('/client/tag/createOrUpdate', isLogin, controller.tag.createOrUpdate);

  router.post('/client/article/createOrUpdate', isLogin, controller.article.createOrUpdate);
  router.get('/client/article/findList', controller.article.findList);
  router.get('/client/article/findById', controller.article.findById);
  router.post('/client/article/like', isLogin, controller.article.like);
  router.post('/client/article/delete', isLogin, controller.article.delete);


};
