'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.auth.login);


  router.post('/upload', middleware.jwt(), controller.upload.upload);


  router.get('/getUserInfo', middleware.jwt(), controller.user.getUserInfo);
  router.post('/user/add', middleware.jwt(), controller.user.add);
  router.get('/user/query', middleware.jwt(), controller.user.query);
  router.get('/user/detail', middleware.jwt(), controller.user.detail);

  router.post('/role/add', middleware.jwt(), controller.role.add);
  router.post('/role/update', middleware.jwt(), controller.role.update);
  router.get('/role/query', middleware.jwt(), controller.role.query);
  router.get('/role/detail', middleware.jwt(), controller.role.detail);
};
