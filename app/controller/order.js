'use strict';

const Controller = require('../core/base_controller');

// const createRule = {
//   openId: { type: 'string', min: 2 },
// };

// const updateRule = {
//   id: { type: 'number' },
// };

class orderController extends Controller {

  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      const code = await this.ctx.service.order.generateCode();
      const res = await ctx.service.order.insert({ ...params, code });
      this.success(res);
    } catch (err) {
      console.log('err :>> ', err);
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }


  async query() {
    const { ctx } = this;
    try {
      const params = ctx.request.query;
      const res = await ctx.service.order.findPage(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  async queryByCustomer() {
    const { ctx } = this;
    try {
      const params = ctx.request.query;
      const res = await ctx.service.order.findListByOpenId(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }


  async status() {
    const { ctx } = this;
    try {
      const { id, status } = ctx.request.body;
      const res = await ctx.service.order.changeStatus(id, status);
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
      const res = await ctx.service.order.findOne(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  async cancel() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      const res = await ctx.service.order.changeStatus(id, 6);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  async pay() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      const res = await ctx.service.order.changeStatus(id, 2);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
}

module.exports = orderController;
