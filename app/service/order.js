// app/service/user.js
const Service = require('egg').Service;
class goodsService extends Service {
  async find(id) {
    const res = await this.app.mysql.get('goods', { id });
    res.specs = await this.app.mysql.select('goods_spec', { where: { goodsId: id } });
    return res;
  }

  async insert(data) {
    const { categoryId, goodsName, img, intro, specs } = data;
    const conn = await this.app.mysql.beginTransaction(); // 初始化事务

    try {
      const { insertId: goodsId } = await conn.insert('goods', {
        categoryId,
        goodsName,
        img,
        intro,
        // 是否上架
        isShelves: 2,
        createUserName: this.ctx.username,
        createUserId: this.ctx.userId,
      }); // 第一步操作
      for (let i = 0; i < specs.length; i++) {
        await conn.insert('goods_spec', {
          goodsId,
          goodsName,
          originalPrice: specs[i].originalPrice,
          price: specs[i].price,
          stock: specs[i].stock,
          spData: specs[i].spData,
        });
      }

      await conn.commit(); // 提交事务
      return { id: goodsId };
    } catch (err) {
      // 错误，回滚
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  async update(data) {
    const { categoryId, goodsName, img, intro, specs, id } = data;
    const conn = await this.app.mysql.beginTransaction(); // 初始化事务

    try {
      await conn.update('goods', {
        updateTime: new Date(),
        id,
        categoryId,
        goodsName,
        img,
        intro,
      }); // 第一步操作
      await conn.delete('goods_spec', {
        goodsId: id,
      });
      for (let i = 0; i < specs.length; i++) {
        await conn.insert('goods_spec', {
          goodsId: id,
          goodsName,
          originalPrice: specs[i].originalPrice,
          price: specs[i].price,
          stock: specs[i].stock,
          spData: specs[i].spData,
        });
      }

      await conn.commit(); // 提交事务
      return { id };
    } catch (err) {
      // 错误，回滚
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  async findList({ openId }) {
    let sql = 'SELECT * FROM `order` WHERE isDelete = 0';
    const params = [];
    if (openId) {
      sql = sql + ' AND openId = ?';
      params.push(openId);
    }

    sql = sql + ' ORDER BY createTime DESC, updateTime DESC';

    const res = await this.app.mysql.query(sql, params);
    return res;
  }

  async del(id) {
    const res = await this.app.mysql.update('goods',
      {
        id,
        isDelete: 1,
      });
    return res;
  }

  async changeStatus(id, status) {
    const res = await this.app.mysql.update('goods',
      {
        id,
        status,
      });
    return res;
  }
}
module.exports = goodsService;
