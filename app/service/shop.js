// app/service/user.js
const Service = require('egg').Service;
class shopService extends Service {
  async find() {
    const res = await this.app.mysql.get('shop', { id: 1 });
    return res;
  }

  async update(data) {
    await this.app.mysql.update('shop', {
      data,
    });
  }

}
module.exports = shopService;
