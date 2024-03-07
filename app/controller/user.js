'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {
  async getUserInfo() {
    const { ctx } = this;
    console.log('ctx.userId :>> ', ctx.userId);
    const res = ctx.service.user.find(ctx.userId);
    this.success(res);
  }
}

module.exports = UserController;
