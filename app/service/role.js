// app/service/user.js
const Service = require('egg').Service;
// 角色
class RoleService extends Service {
  // 根据ID查询角色
  async find(id) {
    const role = await this.app.mysql.get('roles', { id });
    return role;
  }

  // 插入角色
  async insert({ roleName }) {
    const { insertId } = await this.app.mysql.insert('roles', {
      roleName,
      menus: '',
      createUserName: this.ctx.username,
      createUserId: this.ctx.userId,
    });

    return { id: insertId, menus: '' };
  }

  // 更新角色
  async update(data) {
    const res = await this.app.mysql.update('roles', {
      ...data,
      updateTime: new Date(),
    });
    return res;
  }
  // 查询角色列表
  async findList({ roleName }) {
    let sql = 'SELECT * FROM roles WHERE isDelete = 0';
    const params = [];
    if (roleName) {
      sql = sql + ' AND roleName like ?';
      params.push(`%${roleName}%`);
    }

    sql = sql + ' ORDER BY createTime DESC, updateTime DESC';

    const res = await this.app.mysql.query(sql, params);
    return res;
  }

  // 查询所有角色
  async findAll() {
    const res = await this.app.mysql.select('roles');
    return res;
  }
}
module.exports = RoleService;
