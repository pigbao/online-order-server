// app/service/user.js
const Service = require('egg').Service;
// 轮播图
class bannerService extends Service {
  // 根据ID查找轮播图
  async find(id) {
    const res = await this.app.mysql.get('banner', { id });
    return res;
  }

  // 添加轮播图
  async insert(data) {
    const { insertId } = await this.app.mysql.insert('banner', {
      ...data,
    });

    return { id: insertId };
  }

  // 修改轮播图
  async update(data) {
    const res = await this.app.mysql.update('banner', {
      id: data.id,
      url: data.url,
      goodsId: data.goodsId,
      sort: data.sort,
    });
    return res;
  }

  // 查询所有轮播图
  async findList() {
    let sql = 'SELECT * FROM banner';
    sql = sql + ' ORDER BY sort DESC';
    const res = await this.app.mysql.query(sql);
    return res;
  }

  // 删除轮播图
  async del(id) {
    const res = await this.app.mysql.delete('banner', {
      id,
    });
    return res;
  }
}
module.exports = bannerService;
