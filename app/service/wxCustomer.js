// app/service/user.js
const Service = require('egg').Service;
class wxCustomerService extends Service {
  async findByOpenid(openid) {
    const res = await this.app.mysql.get('wx_customer', { openid });
    return res;
  }

  async insert(data) {
    const { insertId } = await this.app.mysql.insert('wx_customer', {
      ...data,
    });
    const res = await this.app.mysql.get('wx_customer', { id: insertId });
    return res;
  }

  async update({ openId, ...data }) {
    console.log('data :>> ', data);
    const result = await this.app.mysql.update('wx_customer', data, {
      where: { openId },
    });
    return result;
  }
}
module.exports = wxCustomerService;
