'use strict';

const Controller = require('../core/base_controller');

const createRule = {
  categoryName: { type: 'string', min: 2 },
};

const updateRule = {
  id: { type: 'number' },
};
// 商品分类
class categoryController extends Controller {
  // 添加分类
  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(createRule, params);
      const res = await ctx.service.category.insert(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 修改分类
  async update() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(updateRule, params);
      const res = await ctx.service.category.update(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 查询分类
  async query() {
    const { ctx } = this;
    try {
      const params = ctx.request.query;
      const res = await ctx.service.category.findList(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 查询分类详情
  async detail() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.query;
      const res = await ctx.service.category.find(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 删除分类
  async del() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.query;
      const res = await ctx.service.category.del(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
}

module.exports = categoryController;
