'use strict';

const Controller = require('../core/base_controller');
const dayjs = require('dayjs');

// 订单
class orderController extends Controller {
  // 添加订单
  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      const code = await this.ctx.service.order.generateCode();
      const res = await ctx.service.order.insert({ ...params, code });
      this.success(res);
    } catch (err) {
      console.log('err :>> ', err);
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 后台订单列表
  async query() {
    const { ctx } = this;
    try {
      const params = ctx.request.query;
      const res = await ctx.service.order.findPage(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 小程序获取客户订单列表
  async queryByCustomer() {
    const { ctx } = this;
    try {
      const params = ctx.request.query;
      const res = await ctx.service.order.findListByOpenId(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 订单状态修改
  async status() {
    const { ctx } = this;
    try {
      const { id, status } = ctx.request.body;
      const res = await ctx.service.order.changeStatus(id, status);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 订单详情
  async detail() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.query;
      const res = await ctx.service.order.findOne(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 订单取消
  async cancel() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      const res = await ctx.service.order.changeStatus(id, 6);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 订单支付
  async pay() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      const res = await ctx.service.order.changeStatus(id, 2);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 后台首页 统计今日订单 销售额 昨日销售额
  async count() {
    const { ctx } = this;
    try {
      const todayCount = await ctx.service.order.todayCount();
      const todayPrice = await ctx.service.order.todayPrice();
      const yesterdayPrice = await ctx.service.order.yesterdayPrice();
      this.success({ todayCount, todayPrice, yesterdayPrice });
    } catch (error) {
      console.error(error);
    }
  }

  // 后台首页 7天订单统计 柱状图
  async orderCountBy7Days() {
    const { ctx } = this;
    try {
      // 7天日期 数组
      const dateArr = [];
      for (let i = 6; i >= 0; i--) {
        const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
        const count = await ctx.service.order.orderCountByDate(date);
        const price = await ctx.service.order.orderPriceByDate(date);
        dateArr.push({
          date,
          count,
          price,
        });
      }
      this.success(dateArr);
    } catch (error) {
      console.error(error);
    }
  }

  // 后台首页 查询待付款订单
  async afoot() {
    const { ctx } = this;
    try {
      const res = await ctx.service.order.afoot();
      this.success(res);
    } catch (error) {
      console.error(error);
      this.error(error);
    }
  }
}

module.exports = orderController;
