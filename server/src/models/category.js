const { Schema, model } = require('mongoose')

const categorySchema = Schema({
  name: { type: String, required: true },
  icon: { type: String },
  color: { type: String }
})

categorySchema.set('toJSON', { virtuals: true })

module.exports = model('Category', categorySchema)
