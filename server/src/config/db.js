const { connection, connect } = require('mongoose')

connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
connection.once('open', () => console.log('Database is conected'))
