'use strict';

const Controller = require('../core/base_controller');

const createRule = {
  username: [ 'required', 'string' ],
  phone: [ 'required', 'string' ],
};

class UserController extends Controller {
  async getUserInfo() {
    const { ctx } = this;
    console.log('ctx.userId :>> ', ctx.userId);
    const res = ctx.service.user.find(ctx.userId);
    this.success(res);
  }

  // 新增用户
  async add() {
    const { ctx } = this;
    try {
      ctx.validate(createRule);
    } catch (err) {
      console.log('err :>> ', err);
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
    const res = ctx.service.user.insert(ctx.userId);
    this.success(res);
  }
}

module.exports = UserController;
