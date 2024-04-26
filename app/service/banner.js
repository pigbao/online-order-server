// app/service/user.js
const Service = require('egg').Service;
class bannerService extends Service {
  async find(id) {
    const res = await this.app.mysql.get('banner', { id });
    return res;
  }

  async insert(data) {
    const { insertId } = await this.app.mysql.insert('banner', {
      ...data,
    });

    return { id: insertId };
  }

  async update(data) {
    const res = await this.app.mysql.update('banner',
      {
        id: data.id,
        url: data.url,
        goodsId: data.goodsId,
        sort: data.sort,
      });
    return res;
  }

  async findList() {
    let sql = 'SELECT * FROM banner';
    sql = sql + ' ORDER BY sort DESC';
    const res = await this.app.mysql.query(sql);
    return res;
  }

  async del(id) {
    const res = await this.app.mysql.delete('banner',
      {
        id,
      });
    return res;
  }
}
module.exports = bannerService;
