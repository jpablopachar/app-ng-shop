const { Router } = require('express')
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
  usersCount
} = require('../controllers/user')

const router = Router()

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.post('/login', login)
router.post('/register', register)
router.get('/get/count', usersCount)

module.exports = router
