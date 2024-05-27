const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body
    if (!fullName || !email || !password) return res.status(401).json({ msg: 'Fields required' })

    const isUser = await userModel.findOne({ email: email })
    if (isUser) return res.status(401).json({ msg: 'User is already exist' })

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new userModel({
      fullName,
      email,
      password: hashedPassword
    })
    const saveUser = await user.save()

    const accessToken = jwt.sign(
      { id: saveUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    saveUser.password = undefined
    return res.status(201).json({
      msg: 'Registrantion Successfull',
      saveUser,
      accessToken
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(401).json({ msg: 'Fields required' })

    const user = await userModel.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    user.password = undefined
    return res.status(200).json({
      msg: 'Login Successful',
      email,
      accessToken
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.getUser = async (req, res) => {
  const { id } = req.user
  const user = await userModel.findOne({ _id: id })
  if (!user) return res.sendStatus(401)

  user.password = undefined
  return res.status(200).json({
    user,
    msg: ''
  })
}