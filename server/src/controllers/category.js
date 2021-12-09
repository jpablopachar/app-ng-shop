const Category = require('../models/category')

const categoryController = {}

categoryController.getCategories = async (req, res) => {
  const categories = await Category.find()

  if (!categories) return res.status(500).json({ success: false })

  res.status(200).send(categories)
}

categoryController.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) return res.status(500).json({ message: 'The category with the given ID was not found' })

  res.status(200).send(category)
}

categoryController.addCategory = async (req, res) => {
  const { name, icon, color } = req.body
  let category = new Category({ name, icon, color })

  category = await category.save()

  if (!category) return res.status(400).send('The category cannot be created')

  res.status(200).send(category)
}

categoryController.updateCategory = async (req, res) => {
  const { name, icon, color } = req.body
  const category = await Category.findByIdAndUpdate(req.params.id, { name, icon, color }, { new: true })

  if (!category) return res.status(400).send('The category cannot be updated')

  res.status(200).send(category)
}

categoryController.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id)

  if (!category) return res.status(404).json({ success: false, message: 'Category not found!' })

  res.status(200).json({ success: true, message: 'The category is deleted' })
}

module.exports = categoryController
