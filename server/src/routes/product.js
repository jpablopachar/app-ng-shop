const { Router } = require('express')
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  totalProducts,
  totalFeatured,
  uploadOptions
} = require('../controllers/product')

const router = Router()

router.route('/').get(getProducts).post(uploadOptions, addProduct)
router.route('/:id').get(getProduct).put(uploadOptions, updateProduct).delete(deleteProduct)
router.get('/get/count', totalProducts)
router.get('/get/featured/:count', totalFeatured)

module.exports = router
