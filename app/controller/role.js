'use strict';

const Controller = require('../core/base_controller');

const createRule = {
  roleName: { type: 'string', min: 2 },
};

const updateRule = {
  id: { type: 'number' },
};

// 角色
class RoleController extends Controller {
  // 添加角色
  async add() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(createRule, params);
      const res = await ctx.service.role.insert(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 修改角色
  async update() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(updateRule, params);
      const res = await ctx.service.role.update(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 查询角色
  async query() {
    const { ctx } = this;
    try {
      const params = ctx.request.query;
      const res = await ctx.service.role.findList(params);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
  // 查询角色详情
  async detail() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.query;
      const res = await ctx.service.role.find(id);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }

  // 查询所有角色
  async all() {
    const { ctx } = this;
    try {
      const res = await ctx.service.role.findAll();
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
  }
}

module.exports = RoleController;
