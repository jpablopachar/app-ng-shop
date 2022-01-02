const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userController = {}

userController.getUsers = async (req, res) => {
  const users = await User.find().select('-passwordHash')

  if (!users) return res.status(500).json({ success: false })

  res.send(users)
}

userController.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash')

  if (!user) {
    return res
      .status(500)
      .json({ message: 'The user with the given ID was not found.' })
  }

  res.status(200).send(user)
}

userController.createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  } = req.body
  let user = new User({
    name,
    email,
    passwordHash: bcryptjs.hashSync(password, 10),
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  })

  user = await user.save()

  if (!user) return res.status(400).send('The user cannot be created!')

  res.send(user)
}

userController.updateUser = async (req, res) => {
  const { id } = req.params
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  } = req.body
  let newPassword = ''

  const currentUser = await User.findById(id)

  if (password) {
    newPassword = bcryptjs.hashSync(password, 10)
  } else {
    newPassword = currentUser.passwordHash
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      passwordHash: newPassword,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country
    },
    { new: true }
  )

  if (!user) return res.status(400).send('The user cannot be created')

  res.send(user)
}

userController.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id)

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found!' })
    }

    res.status(200).json({ success: true, message: 'The user is deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

userController.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const secret = process.env.SECRET

  if (!user) return res.status(400).send('The user not found')

  if (user && bcryptjs.compareSync(password, user.passwordHash)) {
    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, secret, {
      expiresIn: '1d'
    })

    res.status(200).send({ user: user.email, token })
  } else {
    res.status(400).send('Password is wrong!')
  }
}

userController.register = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  } = req.body
  let user = new User({
    name,
    email,
    passwordHash: bcryptjs.hashSync(password, 10),
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  })

  user = await user.save()

  if (!user) return res.status(400).send('The user cannot be created!')

  res.send(user)
}

userController.usersCount = async (req, res) => {
  const usersCount = await User.countDocuments()

  if (!usersCount) return res.status(500).json({ success: false })

  res.send({ usersCount })
}

module.exports = userController
