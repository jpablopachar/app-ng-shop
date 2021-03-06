const { Schema, model } = require('mongoose')

const productSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  richDescription: { type: String, required: true },
  image: { type: String, default: '' },
  images: [{ type: String }],
  brand: { type: String, default: '' },
  price: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  countInStock: { type: Number, min: 0, max: 255, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now }
})

productSchema.set('toJSON', { virtuals: true })

module.exports = model('Product', productSchema)
