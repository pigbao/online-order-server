// app/service/user.js
const Service = require('egg').Service;
// 商品分类
class categoryService extends Service {
  // 根据ID查询商品分类
  async find(id) {
    const role = await this.app.mysql.get('goods_category', { id });
    return role;
  }
  // 添加商品分类
  async insert(data) {
    const { insertId } = await this.app.mysql.insert('goods_category', {
      ...data,
      sort: 0,
      createUserName: this.ctx.username,
      createUserId: this.ctx.userId,
    });

    return { id: insertId };
  }

  // 修改商品分类
  async update(data) {
    const res = await this.app.mysql.update('goods_category', {
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

  // 查询商品分类
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

  // 删除商品分类
  async del(id) {
    const res = await this.app.mysql.update('goods_category', {
      id,
      isDelete: 1,
    });
    return res;
  }
}
module.exports = categoryService;
