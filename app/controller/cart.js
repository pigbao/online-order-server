'use strict';

const Controller = require('../core/base_controller');


class cartController extends Controller {

  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      const goods = await ctx.service.cart.find({ goodsId: params.goodsId, specId: params.specId, openId: params.openId });
      if (goods.length === 1) {
        const res = await ctx.service.cart.update({ id: goods[0].id, count: (params.count + goods[0].count) });
        this.success(res);
      } else {
        const res = await ctx.service.cart.insert({ ...params });
        this.success(res);
      }

    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
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
