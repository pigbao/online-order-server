'use strict';

const Controller = require('../core/base_controller');

// 客户地址
class addressController extends Controller {
  // 新增地址
  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      const res = await ctx.service.address.insert(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 修改地址
  async update() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      const res = await ctx.service.address.update(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 查询地址
  async query() {
    const { ctx } = this;
    try {
      const { openId } = ctx.request.query;
      const res = await ctx.service.address.findList(openId);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 地址详情
  async detail() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.query;
      const res = await ctx.service.address.find(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 删除地址
  async del() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      const res = await ctx.service.address.del(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
}

module.exports = addressController;
