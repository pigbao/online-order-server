'use strict';

const Controller = require('../core/base_controller');
// 微信配置
const wxConfig = {
  appid: 'wx277cf4551d5c9c74',
  appSecret: '7748f147d9e56671d785f129c9bb1967',
};
// 身份验证
class AuthController extends Controller {
  // 员工登录
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    const user = await ctx.service.user.findByPwd(username, password);
    if (!user) {
      return this.error('用户名或密码错误！');
    }
    const token = await ctx.app.jwt.sign(
      { userId: user.id, username: user.username },
      ctx.app.config.jwt.secret,
      { expiresIn: '24h' }
    );
    return this.success(token);
  }

  // 微信登录
  async wxLogin() {
    const { ctx } = this;
    const { code } = ctx.request.body;
    const result = await ctx.curl(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.appid}&secret=${wxConfig.appSecret}&js_code=${code}&grant_type=authorization_code`,
      {
        // 自动解析 JSON 响应
        dataType: 'json',
        // 3 秒超时
        timeout: 3000,
      }
    );
    const { openid } = result.data;
    const customer = await ctx.service.wxCustomer.findByOpenid(openid);
    if (customer) {
      return this.success(customer);
    }

    const newCustomer = await ctx.service.wxCustomer.insert({ openid });
    return this.success(newCustomer);
  }
}

module.exports = AuthController;
