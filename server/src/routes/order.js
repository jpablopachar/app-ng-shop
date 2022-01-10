const { Router } = require('express')
const {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getTotalCount,
  getUserOrders,
  createCheckoutSession
} = require('../controllers/order')

const router = Router()

router.route('/').get(getOrders).post(createOrder)
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder)
router.get('/get/totalSales', getTotalSales)
router.get('/get/count', getTotalCount)
router.get('/get/userOrders/:userId', getUserOrders)
router.get('/create-checkout-session', createCheckoutSession)

module.exports = router
