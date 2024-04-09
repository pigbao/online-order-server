'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.auth.login);


  router.post('/upload', middleware.jwt(), controller.upload.upload);


  router.get('/user/getUserInfo', middleware.jwt(), controller.user.getUserInfo);
  router.post('/user/add', middleware.jwt(), controller.user.add);
  router.get('/user/query', middleware.jwt(), controller.user.query);
  router.get('/user/detail', middleware.jwt(), controller.user.detail);

  router.post('/role/add', middleware.jwt(), controller.role.add);
  router.post('/role/update', middleware.jwt(), controller.role.update);
  router.get('/role/query', middleware.jwt(), controller.role.query);
  router.get('/role/detail', middleware.jwt(), controller.role.detail);
  router.get('/role/all', middleware.jwt(), controller.role.all);

  router.post('/goods/category/add', middleware.jwt(), controller.category.add);
  router.post('/goods/category/update', middleware.jwt(), controller.category.update);
  router.get('/goods/category/query', middleware.jwt(), controller.category.query);
  router.get('/goods/category/detail', middleware.jwt(), controller.category.detail);
  router.get('/goods/category/del', middleware.jwt(), controller.category.del);
};
