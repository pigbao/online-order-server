// app/service/user.js
const Service = require('egg').Service;
class categoryService extends Service {
  async find(id) {
    // 假如我们拿到用户 id，从数据库获取用户详细信息
    const role = await this.app.mysql.get('goods_category', { id });
    return role;
  }

  async insert(data) {
    console.log('data :>> ', data);
    const { insertId } = await this.app.mysql.insert('goods_category', {
      ...data,
      createUserName: this.ctx.username,
      createUserId: this.ctx.userId,
    });

    return { id: insertId };
  }

  async update(data) {
    const res = await this.app.mysql.update('goods_category',
      {
        updateTime: new Date(),
        id: data.id,
        categoryName: data.categoryName,
        icon: data.icon,
        isShow: data.isShow,
        isTakeout: data.isTakeout,
        sort: data.sort,
      });
    return res;
  }

  async findList({ categoryName }) {
    let sql = 'SELECT * FROM goods_category WHERE isDelete = 0';
    const params = [];
    if (categoryName) {
      sql = sql + ' AND categoryName like ?';
      params.push(`%${categoryName}%`);
    }

    sql = sql + ' ORDER BY createTime DESC, updateTime DESC';

    const res = await this.app.mysql.query(sql, params);
    return res;
  }

  async del(id) {
    const res = await this.app.mysql.update('goods_category',
      {
        id,
        isDelete: 1,
      });
    return res;
  }
}
module.exports = categoryService;
