'use strict';

const Controller = require('../core/base_controller');
// 购物车
class cartController extends Controller {
  // 添加
  async add() {
    const { ctx } = this;
    try {
      // 获取参数
      const params = ctx.request.body;
      // 查询购物车中是否已经存在商品
      const goods = await ctx.service.cart.find({
        goodsId: params.goodsId,
        specId: params.specId,
        openId: params.openId,
        isTakeout: params.isTakeout,
      });
      if (goods.length === 1) {
        // 如果存在商品 则将商品数量增加
        const res = await ctx.service.cart.update({
          id: goods[0].id,
          count: params.count + goods[0].count,
        });
        this.success(res);
      } else {
        // 如果不存在商品 则添加新的商品
        const res = await ctx.service.cart.insert({ ...params });
        this.success(res);
      }
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 修改购物车
  async update() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      const res = await ctx.service.cart.update(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 查询购物车
  async query() {
    const { ctx } = this;
    try {
      const { openId, isTakeout } = ctx.request.query;
      const res = await ctx.service.cart.findList(openId, isTakeout);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 购物车详情
  async detail() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.query;
      const res = await ctx.service.cart.find(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 删除购物车
  async del() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      const res = await ctx.service.cart.del(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  //   清空购物车
  async clear() {
    const { ctx } = this;
    try {
      const { openId, isTakeout } = ctx.request.body;
      const res = await ctx.service.cart.clear(openId, isTakeout);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
}

module.exports = cartController;
