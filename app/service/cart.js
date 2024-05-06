// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  async find({ specId, openId, isTakeout }) {
    const result = await this.app.mysql.select('cart', {
      where: { goodsSpecId: specId, openId, isTakeout },
    });
    return result;
  }
  async findList(openId, isTakeout) {
    console.log('isTakeout :>> ', isTakeout);
    const sql =
      'SELECT c.id,c.goodsId,c.count,c.goodsSpecId,c.isTakeout, gs.goodsName, gs.price, gs.stock,gs.spData,gs.originalPrice , g.img ' +
      'FROM cart AS c  ' +
      'JOIN goods_spec AS gs ON c.goodsSpecId = gs.id  ' +
      'JOIN goods AS g ON c.goodsId = g.id  ' +
      'WHERE c.openId = ?  ' +
      'AND c.isTakeout = ?;';
    const result = await this.app.mysql.query(sql, [openId, isTakeout]);
    return result;
  }

  async insert({ specId, count, goodsId, openId, isTakeout }) {
    const { insertId } = await this.app.mysql.insert('cart', {
      goodsSpecId: specId,
      count,
      goodsId,
      openId,
      isTakeout,
    });

    return { id: insertId };
  }

  async update({ id, ...data }) {
    const result = await this.app.mysql.update('cart', data, {
      where: { id },
    });
    return result;
  }

  async del(id) {
    const result = await this.app.mysql.delete('cart', { id });
    return result;
  }

  async clear(openId, isTakeout) {
    const result = await this.app.mysql.delete('cart', { openId, isTakeout });
    return result;
  }
}
module.exports = UserService;
