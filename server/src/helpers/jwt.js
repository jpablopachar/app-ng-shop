const expressJwt = require('express-jwt')

module.exports = function authJwt () {
  const secret = process.env.SECRET

  return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
    path: [
      // { url: /\/src\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /(.*)/, methods: ['GET', 'OPTIONS'] },
      // { url: /\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
      '/api/users/login',
      'api/users/register'
      // { url: /(.*)/ }
    ]
  })
}

async function isRevoked (req, payload, done) {
  console.log(payload)
  if (!payload.isAdmin) return done(null, true)

  done()
}
