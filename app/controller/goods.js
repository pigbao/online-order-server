'use strict';

const Controller = require('../core/base_controller');

const createRule = {
  goodsName: { type: 'string', min: 2 },
};

const updateRule = {
  id: { type: 'number' },
};

class goodsController extends Controller {

  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(createRule, params);
      const res = await ctx.service.goods.insert(params);
      this.success(res);
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
      ctx.validate(updateRule, params);
      const res = await ctx.service.goods.update(params);
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
      const params = ctx.request.query;
      const res = await ctx.service.goods.findList(params);
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
      const res = await ctx.service.goods.find(id);
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
      const { id } = ctx.request.query;
      const res = await ctx.service.goods.del(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  async changeShelves() {
    const { ctx } = this;
    try {
      const { id, isShelves } = ctx.request.query;
      console.log('id :>> ', id);
      console.log('isShelves :>> ', isShelves);
      const res = await ctx.service.goods.changeShelves(id, isShelves);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  async queryCateGoods() {
    const { ctx } = this;
    try {
      const { isTakeout } = ctx.request.query;
      const res = await ctx.service.goods.queryCateGoods(`${isTakeout}`);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  async allGoods() {
    const { ctx } = this;
    try {
      const res = await ctx.service.goods.findAll();
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
}

module.exports = goodsController;
