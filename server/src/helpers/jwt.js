const expressJwt = require('express-jwt')

module.exports = function authJwt () {
  const secret = process.env.SECRET

  return expressJwt({ secret, algorithms: ['HS256', isRevoked] }).unless({
    path: [
      { url: /\/api\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      '/api/users/login',
      '/api/users/register'
    ]
  })
}

async function isRevoked (req, payload, done) {
  if (!payload.isAdmin) return done(null, true)

  done()
}
