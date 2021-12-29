const { Schema, model } = require('mongoose')

const orderItemSchema = Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product' }
})

orderItemSchema.set('toJSON', { virtuals: true })

module.exports = model('OrderItem', orderItemSchema)
