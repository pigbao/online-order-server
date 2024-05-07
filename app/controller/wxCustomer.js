'use strict';

const Controller = require('../core/base_controller');

// 微信客户
class wxCustomerController extends Controller {
  // 更新微信客户信息  包括头像 昵称
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
