'use strict';

const Controller = require('../core/base_controller');
const mapKey = 'F2EBZ-FOECI-KUOG3-UFRWT-IHBUT-FCFAA';
const updateRule = {
  shopName: { type: 'string', min: 2 },
};

// 店铺
class shopController extends Controller {
  // 修改
  async update() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(updateRule, params);
      const res = await ctx.service.shop.update(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 店铺详情
  async detail() {
    const { ctx } = this;
    try {
      const res = await ctx.service.shop.find();
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 小程序查询客户与店铺的距离
  async distance() {
    const { ctx } = this;
    const { from } = ctx.request.query;
    const shop = await ctx.service.shop.find();
    const result = await ctx.curl(
      `https://apis.map.qq.com/ws/distance/v1/matrix/?mode=walking&from=${from}&to=${shop.location}&key=${mapKey}`,
      {
        // 自动解析 JSON 响应
        dataType: 'json',
        // 3 秒超时
        timeout: 3000,
      }
    );
    if (result?.data?.status === 0) {
      this.success(result?.data?.result?.rows[0].elements[0].distance);
    } else {
      this.error('获取距离失败');
    }
  }
}

module.exports = shopController;
