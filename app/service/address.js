// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  async find(id) {
    const result = await this.app.mysql.get('customer_address', { id });
    return result;
  }
  async findList(openId) {
    const result = await this.app.mysql.select('customer_address', {
      where: { openId },
    });
    return result;
  }

  async insert({ address, gender, name, openId, phone }) {
    const { insertId } = await this.app.mysql.insert('customer_address', {
      address,
      gender,
      name,
      openId,
      phone,
    });

    return { id: insertId };
  }

  async update({ id, ...data }) {
    const result = await this.app.mysql.update('customer_address', data, {
      where: { id },
    });
    return result;
  }

  async del(id) {
    const result = await this.app.mysql.delete('customer_address', { id });
    return result;
  }


}
module.exports = UserService;
