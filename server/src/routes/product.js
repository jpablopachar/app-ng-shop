const { Router } = require('express')
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  totalProducts,
  totalFeatured
} = require('../controllers/product')

const router = Router()

router.route('/').get(getProducts).post(addProduct)
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct)
router.get('/get/count', totalProducts)
router.get('/get/featured/:count', totalFeatured)

module.exports = router
