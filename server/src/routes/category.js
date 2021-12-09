const { Router } = require('express')
const {
  getCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category')

const router = Router()

router.route('/').get(getCategories).post(addCategory)
router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory)

module.exports = router
