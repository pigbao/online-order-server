// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  async find({ specId, openId }) {
    const result = await this.app.mysql.select('cart', {
      where: { goodsSpecId: specId, openId },
    });
    return result;
  }
  async findList(openId) {
    const sql = 'SELECT c.id,c.goodsId,c.count,c.goodsSpecId, gs.goodsName, gs.price, gs.stock,gs.spData,gs.originalPrice , g.img '
    + 'FROM cart AS c  '
    + 'JOIN goods_spec AS gs ON c.goodsSpecId = gs.id  '
    + 'JOIN goods AS g ON c.goodsId = g.id  '
    + 'WHERE c.openId = ?;';
    const result = await this.app.mysql.query(sql, [ openId ]);
    return result;
  }

  async insert({ specId, count, goodsId, openId }) {
    const { insertId } = await this.app.mysql.insert('cart', {
      goodsSpecId: specId,
      count,
      goodsId,
      openId,
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

  async clear(openId) {
    const result = await this.app.mysql.delete('cart', { openId });
    return result;
  }

}
module.exports = UserService;
