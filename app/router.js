'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.auth.login);


  router.post('/upload', controller.upload.upload);


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

  router.post('/goods/add', middleware.jwt(), controller.goods.add);
  router.post('/goods/update', middleware.jwt(), controller.goods.update);
  router.get('/goods/query', middleware.jwt(), controller.goods.query);
  router.get('/goods/detail', middleware.jwt(), controller.goods.detail);
  router.get('/goods/del', middleware.jwt(), controller.goods.del);
  router.get('/goods/changeShelves', middleware.jwt(), controller.goods.changeShelves);
  router.get('/goods/all', middleware.jwt(), controller.goods.allGoods);

  router.post('/shop/update', middleware.jwt(), controller.shop.update);
  router.get('/shop/detail', middleware.jwt(), controller.shop.detail);


  router.post('/banner/add', middleware.jwt(), controller.banner.add);
  router.post('/banner/update', middleware.jwt(), controller.banner.update);
  router.get('/banner/query', middleware.jwt(), controller.banner.query);
  router.get('/banner/detail', middleware.jwt(), controller.banner.detail);
  router.get('/banner/del', middleware.jwt(), controller.banner.del);

  // router.post('/goods/add', middleware.jwt(), controller.goods.add);
  // router.post('/goods/update', middleware.jwt(), controller.goods.update);
  // router.get('/goods/query', middleware.jwt(), controller.goods.query);
  // router.get('/goods/detail', middleware.jwt(), controller.goods.detail);
  // router.get('/goods/del', middleware.jwt(), controller.goods.del);
  router.post('/order/status', middleware.jwt(), controller.order.status);
  router.get('/order/query', middleware.jwt(), controller.order.query);
  router.get('/order/detail', middleware.jwt(), controller.order.detail);

  router.post('/wx/login', controller.auth.wxLogin);

  router.get('/wx/banner/query', controller.banner.query);

  router.get('/wx/goods/query', controller.goods.queryCateGoods);
  router.get('/wx/goods/detail', controller.goods.detail);

  router.post('/wx/cart/add', controller.cart.add);
  router.post('/wx/cart/update', controller.cart.update);
  router.post('/wx/cart/del', controller.cart.del);
  router.get('/wx/cart/query', controller.cart.query);
  router.post('/wx/cart/clear', controller.cart.clear);


  router.post('/wx/order/add', controller.order.add);
  router.get('/wx/order/query', controller.order.queryByCustomer);
  router.get('/wx/order/detail', controller.order.detail);
  router.post('/wx/order/cancel', controller.order.cancel);
  router.post('/wx/order/pay', controller.order.pay);

  router.get('/wx/shop/query', controller.shop.detail);
  router.get('/wx/shop/distance', controller.shop.distance);
};
