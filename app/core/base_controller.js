// app/core/base_controller.js
const { Controller } = require('egg');
class BaseController extends Controller {
  // get user() {
  //   return this.ctx.session.user;
  // }

  // 成功返回
  success(data) {
    this.ctx.body = {
      code: 200,
      data,
    };
  }

  // 错误返回
  error(msg, data = {}) {
    this.ctx.body = {
      code: 500,
      data,
      msg,
    };
  }

  // notFound(msg) {
  //   msg = msg || 'not found';
  //   this.ctx.throw(404, msg);
  // }
}
module.exports = BaseController;
