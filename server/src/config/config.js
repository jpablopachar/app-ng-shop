const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authJwt = require('../helpers/jwt')
const errorHandler = require('../helpers/error-handler')

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(authJwt())
app.use(errorHandler())

app.use('/api/categories', require('../routes/category'))
app.use('/api/products', require('../routes/product'))

module.exports = app
