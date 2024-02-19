'use strict';

const Controller = require('../core/base_controller');

class AuthController extends Controller {
  async login() {
    const { ctx } = this;
    this.success('我是捣蛋鬼');
  }
}

module.exports = AuthController;
