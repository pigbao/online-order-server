'use strict';

const Controller = require('../core/base_controller');

const createRule = {
  goodsName: { type: 'string', min: 2 },
};

const updateRule = {
  id: { type: 'number' },
};
// 商品控制器
class goodsController extends Controller {
  // 添加商品
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
  // 修改商品
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
  // 查询商品
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

  // 商品详情
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
  // 删除商品
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

  // 修改商品上下架
  async changeShelves() {
    const { ctx } = this;
    try {
      const { id, isShelves } = ctx.request.query;
      const res = await ctx.service.goods.changeShelves(id, isShelves);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 小程序查询分类下的商品
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

  // 查询所有商品
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

  // 小程序搜索商品
  async search() {
    const { ctx } = this;
    try {
      const { value, isTakeout } = ctx.request.query;
      const res = await ctx.service.goods.search(value, isTakeout);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
}

module.exports = goodsController;
