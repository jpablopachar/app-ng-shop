const { isValidObjectId } = require('mongoose')
const Product = require('../models/product')
const Category = require('../models/category')
const multer = require('multer')

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadError = new Error('Invalid image type')
    const isValid = FILE_TYPE_MAP[file.mimetype]

    if (isValid) uploadError = null

    cb(uploadError, 'src/public/uploads')
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(' ').join('-')
    const extension = FILE_TYPE_MAP[file.mimetype]

    cb(null, `${filename}-${Date.now()}.${extension}`)
  }
})

const productController = {}

productController.uploadOptions = multer({ storage }).single('image')

productController.getProducts = async (req, res) => {
  let filter = {}

  if (req.query.categories) {
    filter = { category: req.query.categories.split(',') }
  }

  const products = await Product.find(filter).populate('category')

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

  const file = req.file

  if (!file) return res.status(400).send('No image in the request')

  const fileName = file.filename
  const image = `${req.protocol}://${req.get('host')}/${fileName}`
  const {
    category,
    name,
    description,
    richDescription,
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

  let image = ''

  if (!isValidObjectId(id)) return res.status(400).send('Invalid product id')

  const objCategory = await Category.findById(req.body.category)

  if (!objCategory) return res.status(400).send('Invalid category')

  const objProduct = await Product.findById(id)

  if (!objProduct) return res.status(400).send('Invalid product')

  const file = req.file

  if (file) {
    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}`

    image = `${basePath}/${fileName}`
  } else {
    image = objProduct.image
  }

  const {
    category,
    name,
    description,
    richDescription,
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
  const productsCount = await Product.countDocuments()

  if (!productsCount) return res.status(500).json({ success: false })

  res.status(200).send({ productsCount })
}

productController.totalFeatured = async (req, res) => {
  const { count } = req.params
  // eslint-disable-next-line no-unneeded-ternary
  const objCount = count ? count : 0
  const products = await Product.find({ isFeatured: true }).limit(+objCount)

  if (!products) return res.status(500).json({ success: false })

  res.status(200).send(products)
}

productController.galleryImages = async (req, res) => {
  const { id } = req.params

  if (isValidObjectId(id)) return res.status(400).send('Invalid product id')

  const images = []
  const files = []
  const basePath = `${req.protocol}://${req.get('host')}/src/public/uploads/`

  if (files) {
    files.map((file) => images.push(`${basePath}${file.filename}`))
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { images },
    { new: true }
  )

  if (!product) return res.status(500).send('The gallery cannot be updated')

  res.send(product)
}

module.exports = productController
