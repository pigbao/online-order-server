// app/service/user.js
const Service = require('egg').Service;
// 地址
class AddressService extends Service {
  // 根据Id查询地址
  async find(id) {
    const result = await this.app.mysql.get('customer_address', { id });
    return result;
  }

  // 根据OpenId 查询地址列表
  async findList(openId) {
    const result = await this.app.mysql.select('customer_address', {
      where: { openId },
    });
    return result;
  }

  // 添加地址
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

  // 修改地址
  async update({ id, ...data }) {
    const result = await this.app.mysql.update('customer_address', data, {
      where: { id },
    });
    return result;
  }

  // 删除地址
  async del(id) {
    const result = await this.app.mysql.delete('customer_address', { id });
    return result;
  }
}
module.exports = AddressService;
