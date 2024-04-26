// app/service/user.js
const Service = require('egg').Service;
class goodsService extends Service {
  async find(id) {
    const res = await this.app.mysql.get('goods', { id });
    res.specs = await this.app.mysql.select('goods_spec', {
      where: { goodsId: id },
    });
    return res;
  }

  async insert(data) {
    const { categoryId, goodsName, img, intro, specs } = data;
    const conn = await this.app.mysql.beginTransaction(); // 初始化事务

    try {
      const min = specs.reduce((pre, cur) => {
        return pre.price < cur.price ? pre : cur;
      });
      const { insertId: goodsId } = await conn.insert('goods', {
        categoryId,
        goodsName,
        img,
        intro,
        minPrice: min.price,
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
    const min = specs.reduce((pre, cur) => {
      return pre.price < cur.price ? pre : cur;
    });
    const conn = await this.app.mysql.beginTransaction(); // 初始化事务

    try {
      await conn.update('goods', {
        updateTime: new Date(),
        id,
        categoryId,
        goodsName,
        img,
        intro,
        minPrice: min.price,
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

  async findList({ goodsName }) {
    let sql = 'SELECT * FROM goods WHERE isDelete = 0';
    const params = [];
    if (goodsName) {
      sql = sql + ' AND goodsName like ?';
      params.push(`%${goodsName}%`);
    }


    sql = sql + ' ORDER BY createTime DESC, updateTime DESC';

    const res = await this.app.mysql.query(sql, params);
    return res;
  }

  async findAll() {
    const res = await this.app.mysql.select('goods', {
      where: { isDelete: 0 },
      orders: [
        [ 'createTime', 'DESC' ],
        [ 'updateTime', 'DESC' ],
      ],
    });
    return res;
  }

  async del(id) {
    const res = await this.app.mysql.update('goods', {
      id,
      isDelete: 1,
    });
    return res;
  }

  async changeShelves(id, isShelves) {
    const res = await this.app.mysql.update('goods', {
      id,
      isShelves,
    });
    return res;
  }

  async queryCateGoods(isTakeout) {
    const sql = 'SELECT gc.id, gc.categoryName, g.id AS goodsId,g.goodsName AS goodsName, g.intro, g.img, g.minPrice '
    + 'FROM goods_category gc '
    + 'LEFT JOIN goods g ON gc.id = g.categoryId AND (g.id IS NOT NULL OR g.isDelete = 0) '
    + 'WHERE gc.isDelete = 0 '
    + ' AND gc.isTakeout like ? '
    + 'ORDER BY gc.sort, gc.id, g.id;';
    const rows = await this.app.mysql.query(sql, [ `%${isTakeout}%` ]);

    const result = rows.reduce((acc, cur) => {
      const { id, categoryName } = cur;
      if (acc.length === 0 || acc[acc.length - 1].id !== id) {
        acc.push({
          id,
          categoryName,
          goods: [],
        });
      }
      if (!cur.goodsId) {
        return acc;
      }
      acc[acc.length - 1].goods.push({
        ...cur,
      });
      return acc;
    }, []);

    return result;
  }
}
module.exports = goodsService;
