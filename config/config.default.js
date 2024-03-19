/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1699874463335_1479';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.multipart = {
    mode: 'file',
  };

  // 全局配置jwt
  config.jwt = {
    secret: '22', // 这个是加密秘钥，自行添加
  };

  // 配置静态文件目录
  config.static = {
    prefix: '/public/', // 这里的 prefix 应该和返回的 URL 匹配
    dir: path.join(appInfo.baseDir, 'app/public'),
    // 配置静态资源中间件
    dynamic: true,
    preload: false,
    maxAge: 31536000,
    buffer: true,
  };

  // config/config.${env}.js
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '192.168.0.103',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '3210074200',
      // 数据库名
      database: 'online_order',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.validate = {
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
