// app/service/user.js
const Service = require('egg').Service;
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');
class orderService extends Service {
  async generateCode() {
    const { app } = this;
    const today = dayjs().format('YYYY-MM-DD');

    const res = await app.mysql.query(
      'SELECT * FROM `order` WHERE DATE(createTime) = ? ORDER BY createTime DESC;',
      [today]
    );

    if (res.length > 0) {
      return res[0].code + 1;
    }
    const newCode = 1;
    return newCode;
  }

  async find(id) {
    const res = await this.app.mysql.get('order', { id });
    return res;
  }

  async findOne(id) {
    const order = await this.app.mysql.get('order', { id });
    order.goods = await this.app.mysql.select('order_goods', {
      where: { orderId: id },
    });
    return order;
  }

  async insert(data) {
    const {
      isTakeout,
      cartList,
      remark,
      openId,
      code,
      address,
      customerName,
      customerPhone,
      gender,
    } = data;
    const conn = await this.app.mysql.beginTransaction(); // 初始化事务
    try {
      const orderNum = uuidv4();
      const payPrice = cartList.reduce((acc, cur) => {
        return acc + cur.price * cur.count;
      }, 0);

      const { insertId: orderId } = await conn.insert('order', {
        isTakeout,
        orderNum,
        remark,
        openId,
        orderStatus: 1,
        code,
        payPrice,
        createUserName: this.ctx.username,
        createUserId: this.ctx.userId,
        address,
        customerName,
        customerPhone,
        gender,
      });
      for (let i = 0; i < cartList.length; i++) {
        await conn.insert('order_goods', {
          orderId,
          goodsId: cartList[i].goodsId,
          goodsName: cartList[i].goodsName,
          goodsImg: cartList[i].img,
          goodsPrice: cartList[i].price,
          goodsSpec: cartList[i].spData,
          count: cartList[i].count,
        });
        await conn.update('goods_spec', {
          id: cartList[i].goodsSpecId,
          stock: cartList[i].stock - cartList[i].count,
        });
      }
      await conn.delete('cart', { openId, isTakeout });
      await conn.commit(); // 提交事务
      return { id: orderId, payPrice };
    } catch (err) {
      // 错误，回滚
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  async findPage({ pageNum, pageSize, orderStatus, orderNum }) {
    const { app } = this;
    let sql = 'SELECT * FROM `order` WHERE isDelete = 0';
    const params = [];
    if (orderStatus) {
      sql = sql + ' AND orderStatus = ?';
      params.push(orderStatus);
    }
    if (orderNum) {
      sql = sql + ' AND orderNum = ?';
      params.push(orderNum);
    }
    sql = sql + ' ORDER BY createTime ASC, updateTime DESC  LIMIT ?,?';
    params.push((parseInt(pageNum) - 1) * pageSize);
    params.push(parseInt(pageSize));
    const orders = await app.mysql.query(sql, params);
    const total = await app.mysql.query(
      'SELECT COUNT(*) AS total FROM `order` WHERE isDelete = 0'
    );
    return {
      list: orders,
      total: total[0].total,
    };
  }

  async findListByOpenId({ openId }) {
    let sql = 'SELECT * FROM `order` WHERE isDelete = 0';
    const params = [];
    if (openId) {
      sql = sql + ' AND openId = ?';
      params.push(openId);
    }

    sql = sql + ' ORDER BY createTime DESC, updateTime DESC';

    const orders = await this.app.mysql.query(sql, params);
    for (let i = 0; i < orders.length; i++) {
      const goods = await this.app.mysql.select('order_goods', {
        where: { orderId: orders[i].id },
      });
      orders[i].goods = goods;
    }
    return orders;
  }

  async del(id) {
    const res = await this.app.mysql.update('order', {
      id,
      isDelete: 1,
    });
    return res;
  }

  async changeStatus(id, orderStatus) {
    const res = await this.app.mysql.update('order', {
      id,
      orderStatus,
    });
    return res;
  }

  /**
   * 查询10分钟前未支付的订单
   */
  async findUnPay() {
    const res = await this.app.mysql.query(
      'SELECT * FROM `order` WHERE orderStatus = 1 AND isDelete = 0 AND createTime < DATE_SUB(NOW(), INTERVAL 10 MINUTE) ORDER BY createTime DESC;'
    );
    return res;
  }

  /**
   * 统计今日订单
   */
  async todayCount() {
    const res = await this.app.mysql.query(
      'SELECT COUNT(*) AS total FROM `order` WHERE DATE(createTime) = DATE(NOW()) AND isDelete = 0 AND orderStatus = 4;'
    );
    return res[0].total;
  }

  /**
   * 统计今日销售额
   */
  async todayPrice() {
    const res = await this.app.mysql.query(
      'SELECT SUM(payPrice) AS total FROM `order` WHERE DATE(createTime) = DATE(NOW()) AND isDelete = 0 AND orderStatus = 4;'
    );
    return res[0].total;
  }

  /**
   * 统计昨日订单销售额
   */
  async yesterdayPrice() {
    const res = await this.app.mysql.query(
      'SELECT SUM(payPrice) AS total FROM `order` WHERE DATE(createTime) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND isDelete = 0 AND orderStatus = 4;'
    );
    return res[0].total;
  }

  /**
   * 查询进行中订单 orderStatus = 2 | 3 |5
   */
  async afoot() {
    console.log(1);
    try {
      const orders = await this.app.mysql.query(
        'SELECT * FROM `order`  WHERE orderStatus = 2 OR orderStatus = 3 OR orderStatus = 5 AND isDelete = 0 ORDER BY createTime ASC;'
      );
      for (let i = 0; i < orders.length; i++) {
        const goods = await this.app.mysql.select('order_goods', {
          where: { orderId: orders[i].id },
        });
        orders[i].goods = goods;
      }
      return orders;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 按日期查询 已完成订单总数
   * @param date
   */
  async orderCountByDate(date) {
    const res = await this.app.mysql.query(
      `SELECT COUNT(*) AS total FROM \`order\` WHERE DATE(createTime) = '${date}' AND isDelete = 0 AND orderStatus = 4;`
    );
    return res[0].total;
  }

  /**
   * 按日期查询 已完成订单销售额
   * @param date
   */
  async orderPriceByDate(date) {
    const res = await this.app.mysql.query(
      `SELECT SUM(payPrice) AS total FROM \`order\` WHERE DATE(createTime) = '${date}' AND isDelete = 0 AND orderStatus = 4;`
    );
    return res[0].total;
  }
}
module.exports = orderService;
