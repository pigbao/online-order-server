// app/service/user.js
const Service = require('egg').Service;
// 管理员与员工
class UserService extends Service {
  // 根据ID查询用户
  async find(uid) {
    const sql = `SELECT u.*, r.roleName, r.menus, r.isDelete, r.createUserName, r.createUserId, r.createTime, r.updateTime
    FROM users u
    JOIN roles r ON u.role = r.id
    WHERE u.id = ?;`;
    const user = await this.app.mysql.query(sql, [uid]);
    return user[0];
  }

  // 根据用户名密码查询用户
  async findByPwd(username, password) {
    // 假如我们拿到用户 id，从数据库获取用户详细信息
    const user = await this.app.mysql.get('users', {
      username,
      password,
    });
    return user;
  }
  // 添加用户
  async insert({ username, phone, avatar, password }) {
    const { insertId } = await this.app.mysql.insert('users', {
      username,
      phone,
      avatar,
      password,
      createUserName: this.ctx.username,
      createUserId: this.ctx.userId,
    });

    return { id: insertId };
  }
  // 修改用户
  async update({ id, username, phone, avatar, password }) {
    const user = await this.app.mysql.get('users', { id });
    if (!user) {
      return null;
    }
    const updateUser = {
      id,
      username,
      phone,
      avatar,
      password,
      updateTime: new Date(),
    };
    const result = await this.app.mysql.update('users', updateUser);
    return result.affectedRows === 1;
  }
  // 分页查询用户列表
  async findPage({ pageNum, pageSize, username, phone }) {
    let sql =
      'SELECT id, username, role, avatar,phone,createUserName,createUserId,createTime,updateTime FROM users WHERE isDelete = 0';
    const params = [];
    if (username) {
      sql = sql + ' AND username like ?';
      params.push(`%${username}%`);
    }
    if (phone) {
      sql = sql + ' AND phone like ?';
      params.push(`%${phone}%`);
    }

    sql = sql + ' ORDER BY createTime DESC, updateTime DESC LIMIT ?,?';
    params.push((parseInt(pageNum) - 1) * pageSize);
    params.push(parseInt(pageSize));
    const res = await this.app.mysql.query(sql, params);
    return res;
  }
}
module.exports = UserService;
