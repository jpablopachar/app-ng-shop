const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  street: { type: String, default: '' },
  apartment: { type: String, default: '' },
  zip: { type: String, default: '' },
  city: { type: String, default: '' },
  country: { type: String, default: '' }
})

module.exports = model('User', userSchema)
