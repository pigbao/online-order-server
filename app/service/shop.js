// app/service/user.js
const Service = require('egg').Service;
class shopService extends Service {
  async find() {
    const res = await this.app.mysql.get('shop', { id: 1 });
    return res;
  }

  async update({ shopName, startOpeningHours, endOpeningHours, phone, address, location }) {
    try {
      const res = await this.app.mysql.update('shop', {
        id: 1,
        shopName, startOpeningHours, endOpeningHours, phone, address, location,
      });
      return res;
    } catch (error) {
      console.log('error :>> ', error);
      throw error;
    }

  }

}
module.exports = shopService;
