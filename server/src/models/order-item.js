const { Schema, model } = require('mongoose')

const orderItemSchema = Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product' }
})

module.exports = model('OrderItem', orderItemSchema)
