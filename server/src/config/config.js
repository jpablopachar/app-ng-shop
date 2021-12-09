const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/categories', require('../routes/category'))
app.use('/api/products', require('../routes/product'))

module.exports = app
