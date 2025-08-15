import { Request, Response } from 'express';

import { orderSchema } from '@repo/db';

class OrderController {
  static async clientCreateOrder(req: Request, res: Response) {
    try {
      const orderData = new orderSchema(req.body.data);
      orderData
        .save()
        .then((createdOrder) => {
          res.json({ createdOrder, error: false });
        })
        .catch((err) => {
          console.log(err);
          res.json({ error: true, err });
        });
    } catch (err) {
      console.log(err);
      res.json({ error: true, err });
    }
  }

  //---------------------Dashboard--------------------

  static async dashboardGetOrders(req: Request, res: Response) {
    const size = parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size);
    const pageNo = req.body.pageNo || 1;
    let orderTypeQuery = req.body.orderType === 'all' ? {} : { type: req.body.orderType };
    let statusQuery = req.body.status === 'all' ? {} : { status: req.body.status };

    let searchQuery =
      req.body.keyword === ''
        ? {}
        : {
            $or: [{ buyer: new RegExp(req.body.keyword, 'i') }, { shippingAddress: new RegExp(req.body.keyword, 'i') }],
          };

    let sortQuery = req.body.sort === 'latest' || req.body.sort === 'random' ? { lastModify: -1 } : { [req.body.sort]: -1 };
    const ordersCount = orderSchema.countDocuments({ $and: [statusQuery, orderTypeQuery, searchQuery] }).exec();
    //@ts-ignore
    const orders = orderSchema
      .find({ $and: [orderTypeQuery, statusQuery, searchQuery] })
      .skip(size * (pageNo - 1))
      .limit(size)
      // @ts-expect-error: it's fine
      .sort(sortQuery)
      .exec();
    Promise.all([orders, ordersCount])
      .then(async (data) => {
        res.json({ orders: data[0], error: false, totalCount: data[1] });
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'Server Error',
        });
      });
  }
}

export default OrderController;
