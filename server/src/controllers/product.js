const { isValidObjectId } = require('mongoose')
const Product = require('../models/product')
const Category = require('../models/category')

const productController = {}

productController.getProducts = async (req, res) => {
  const products = await Product.find({
    category: req.query.categories.split(',')
  }).populate('category')

  if (!products) return res.status(500).json({ success: false })

  res.send(products)
}

productController.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category')

  if (!product) return res.status(500).json({ success: false })

  res.status(200).send(product)
}

productController.addProduct = async (req, res) => {
  const objCategory = await Category.findById(req.body.category)

  if (!objCategory) return res.status(400).send('Invalid category')

  const {
    category,
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    countInStock,
    rating,
    numReviews,
    isFeatured
  } = req.body

  let product = new Product({
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured
  })

  product = await product.save()

  if (!product) return res.status(500).send('The product cannot be created')

  res.status(200).send(product)
}

productController.updateProduct = async (req, res) => {
  const { id } = req.params
  if (!isValidObjectId(id)) return res.status(400).send('Invalid product id')

  const objCategory = await Category.findById(req.body.category)

  if (!objCategory) return res.status(400).send('Invalid category')

  const {
    category,
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    countInStock,
    rating,
    numReviews,
    isFeatured
  } = req.body

  const product = await Product.findByIdAndUpdate(
    id,
    {
      category,
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      countInStock,
      rating,
      numReviews,
      isFeatured
    },
    { new: true }
  )

  if (!product) return res.status(500).send('The product cannot be updated')

  res.status(200).send(product)
}

productController.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id)

  if (!product) {
    return res
      .status(400)
      .json({ success: false, message: 'Product not found' })
  }

  res.status(200).json({ success: true, message: 'The product is deleted' })
}

productController.totalProducts = async (req, res) => {
  const productCount = await Product.countDocuments((count) => count)

  if (!productCount) return res.status(500).json({ success: false })

  res.status(200).send({ productCount })
}

productController.totalFeatured = async (req, res) => {
  const { count } = req.params
  // eslint-disable-next-line no-unneeded-ternary
  const objCount = count ? count : 0
  const products = await Product.find({ isFeatured: true }).limit(+objCount)

  if (!products) return res.status(500).json({ success: false })

  res.status(200).send(products)
}

module.exports = productController
