'use strict';

// 定制白名单
const whiteList = [ '/login' ];

module.exports = () => {
  return async function(ctx, next) {
    if (!whiteList.some(item => item === ctx.request.url)) {
      // 判断接口路径是否在白名单
      const token = ctx.request.header.authorization; // 拿到token
      console.log('token :>> ', token);
      if (token) {
        // 如果token存在
        const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret); // 解密token
        if (decoded) {
          ctx.userId = decoded.userId; // 把openid存在ctx上，方便后续操作。
          await next();
        }
      } else {
        ctx.body = {
          code: 401,
          msg: '登录状态已过期，请重新登录',
        };
      }
    } else {
      await next();
    }
  };
};
