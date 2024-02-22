// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  async find(uid) {
    // 假如我们拿到用户 id，从数据库获取用户详细信息
    const user = await this.app.mysql.get('users', { id: uid });
    return { user };
  }
  async findByPwd(username, password) {
    // 假如我们拿到用户 id，从数据库获取用户详细信息
    const user = await this.app.mysql.get('users', {
      username: username,
      password: password,
    });
    return user;
  }
}
module.exports = UserService;
