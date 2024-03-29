'use strict';

const Controller = require('../core/base_controller');

class AuthController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    const user = await ctx.service.user.findByPwd(username, password);
    console.log('user :>> ', user);
    if (!user) {
      return this.error('用户名或密码错误！');
    }
    const token = await ctx.app.jwt.sign(
      { openid: 123 },
      ctx.app.config.jwt.secret,
      { expiresIn: '24h' }
    );
    return this.success(token);
  }
}

module.exports = AuthController;
