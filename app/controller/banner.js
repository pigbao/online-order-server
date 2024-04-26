'use strict';

const Controller = require('../core/base_controller');

const createRule = {
  url: { type: 'string', min: 2 },
};

const updateRule = {
  id: { type: 'number' },
};

class bannerController extends Controller {

  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(createRule, params);
      const res = await ctx.service.banner.insert(params);
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
      const res = await ctx.service.banner.update(params);
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
      const res = await ctx.service.banner.findList(params);
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
      const res = await ctx.service.banner.find(id);
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
      const res = await ctx.service.banner.del(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }


}

module.exports = bannerController;
