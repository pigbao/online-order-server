'use strict';

const Controller = require('../core/base_controller');


class wxCustomerController extends Controller {

  async update() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      const res = await ctx.service.wxCustomer.update(params);
      this.success(res);

    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }


}

module.exports = wxCustomerController;
