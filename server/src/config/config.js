const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authJwt = require('../helpers/jwt')
const errorHandler = require('../helpers/error-handler')
const path = require('path')

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(authJwt())
app.use(express.static(path.join(__dirname, '../public/uploads/')))
app.use(errorHandler)

console.log(path.join(__dirname))

app.use('/api/categories', require('../routes/category'))
app.use('/api/products', require('../routes/product'))
app.use('/api/users', require('../routes/user'))
app.use('/api/orders', require('../routes/order'))

module.exports = app
