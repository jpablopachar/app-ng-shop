require('dotenv').config()
require('./config/db')

const app = require('./config/config')

app.listen(app.get('port'), () => console.log(`Server on port: ${app.get('port')}`))
