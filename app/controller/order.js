'use strict';

const Controller = require('../core/base_controller');

// const createRule = {
//   goodsName: { type: 'string', min: 2 },
// };

// const updateRule = {
//   id: { type: 'number' },
// };

class orderController extends Controller {


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

  async queryByCustomer() {
    const { ctx } = this;
    try {
      const params = ctx.request.query;
      const res = await ctx.service.order.findList({ params, openId: '123' });
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
}

module.exports = orderController;
