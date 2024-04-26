// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  async insert({ specId, count, goodsId, openId }) {
    const { insertId } = await this.app.mysql.insert('cart', {
      goodsSpecId: specId,
      count,
      goodsId,
      openId,
    });

    return { id: insertId };
  }

}
module.exports = UserService;
