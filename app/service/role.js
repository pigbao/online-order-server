// app/service/user.js
const Service = require('egg').Service;
class RoleService extends Service {
  async find(id) {
    // 假如我们拿到用户 id，从数据库获取用户详细信息
    const role = await this.app.mysql.get('roles', { id });
    return role;
  }

  async insert({ roleName }) {
    const { insertId } = await this.app.mysql.insert('roles', {
      roleName,
      menus: '',
      createUserName: this.ctx.username,
      createUserId: this.ctx.userId,
    });

    return { id: insertId, menus: '' };
  }

  async update(data) {
    const res = await this.app.mysql.update('roles', { ...data, updateTime: new Date() });
    return res;
  }

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

  async findAll() {
    const res = await this.app.mysql.select('roles');
    return res;
  }
}
module.exports = RoleService;
