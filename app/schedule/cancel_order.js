module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true,
  },
  async task(ctx) {

    const unpaidOrders = await ctx.service.order.findUnPay();
    for (const order of unpaidOrders) {
      if (order.orderStatus === 1) {
        await ctx.service.order.changeStatus(order.id, 6);
      }
    }
  },
};
