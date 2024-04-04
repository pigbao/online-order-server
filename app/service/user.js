// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  async find(uid) {
    // 假如我们拿到用户 id，从数据库获取用户详细信息
    const user = await this.app.mysql.get('users', { id: uid });
    return user;
  }
  async findByPwd(username, password) {
    // 假如我们拿到用户 id，从数据库获取用户详细信息
    const user = await this.app.mysql.get('users', {
      username,
      password,
    });
    return user;
  }

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

  async findPage({ pageNum, pageSize, username, phone }) {
    let sql = 'SELECT id, username, roles, avatar,phone,createUserName,createUserId,createTime,updateTime FROM users WHERE isDelete = 0';
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
