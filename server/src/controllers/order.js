const Order = require('../models/order')
const OrderItem = require('../models/order-item')

const orderController = {}

orderController.getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name')
    .sort({ dateOrdered: -1 })

  if (!orders) return res.status(500).json({ success: false })

  res.send(orders)
}

orderController.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category'
      }
    })

  if (!order) return res.status(500).json({ success: false })

  res.send(order)
}

orderController.createOrder = async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      const { quantity, product } = orderItem

      let newOrderItem = new OrderItem({ quantity, product })

      newOrderItem = await newOrderItem.save()

      return newOrderItem._id
    })
  )

  const orderItemsIdsResolved = await orderItemsIds

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        'product',
        'price'
      )
      const totalPrice = orderItem.product.price + orderItem.quantity

      return totalPrice
    })
  )

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

  const {
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    user
  } = req.body

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user
  })

  order = await order.save()

  if (!order) return res.status(400).send('The order cannot be created')

  res.send(order)
}

orderController.updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  )

  if (!order) return res.status(400).send('The order cannot be update')

  res.send(order)
}

orderController.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id)

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' })
    }

    await order.orderItems.map(
      async (orderItem) => await OrderItem.findByIdAndRemove(orderItem)
    )

    return res
      .status(500)
      .json({ success: true, message: 'The order is deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

orderController.getTotalSales = async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }
  ])

  if (!totalSales) { return res.status(400).send('The order sales cannot be generated') }

  res.send({ totalSales: totalSales.pop().totalSales })
}

orderController.getTotalCount = async (req, res) => {
  const orderCount = await Order.countDocuments()

  if (!orderCount) return res.status(500).json({ success: false })

  res.send({ orderCount })
}

orderController.getUserOrders = async (req, res) => {
  const userOrders = await Order.find({ user: req.params.userId })
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category'
      }
    })
    .sort({ dateOrdered: -1 })

  if (!userOrders) return res.status(500).json({ success: false })

  res.send(userOrders)
}

module.exports = orderController
