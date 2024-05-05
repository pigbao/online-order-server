'use strict';

const Controller = require('../core/base_controller');


class addressController extends Controller {

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
