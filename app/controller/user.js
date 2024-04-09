'use strict';

const Controller = require('../core/base_controller');

const createRule = {
  username: { type: 'string', min: 2 },
  phone: 'string',
  password: 'password',
};

class UserController extends Controller {
  async getUserInfo() {
    const { ctx } = this;
    const res = await ctx.service.user.find(ctx.userId);
    this.success(res);
  }

  // 新增用户
  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(createRule, params);
      const res = await ctx.service.user.insert(params);
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
      const res = await ctx.service.user.findPage(params);
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
      const res = await ctx.service.user.find(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
}

module.exports = UserController;
