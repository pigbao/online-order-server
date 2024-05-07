// app/service/user.js
const Service = require('egg').Service;
// 微信客户
class wxCustomerService extends Service {
  // 根据OpenId查询微信客户
  async findByOpenid(openid) {
    const res = await this.app.mysql.get('wx_customer', { openid });
    return res;
  }

  // 添加微信客户
  async insert(data) {
    const { insertId } = await this.app.mysql.insert('wx_customer', {
      ...data,
    });
    const res = await this.app.mysql.get('wx_customer', { id: insertId });
    return res;
  }

  // 更新微信客户
  async update({ openId, ...data }) {
    console.log('data :>> ', data);
    const result = await this.app.mysql.update('wx_customer', data, {
      where: { openId },
    });
    return result;
  }
}
module.exports = wxCustomerService;
