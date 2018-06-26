const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Users Works'
}));

// @Route POST api/users/register
// @desc Register User
// @access Public
router.post('/register', async (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const user = await User.findOne({
    email: req.body.email
  })
  if (user) {
    errors.email = 'Email already exists'
    return res.json({
      result: 'fail',
      status: 400,
      errors,
    })    
  } else {
    const avatar = gravatar.url(req.body.email, {
      s: '200', //Size
      r: 'pg', //Rating
      d: 'mm' //Default
    })
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err
        newUser.password = hash
        const user = await newUser.save()
        res.json(user)
      })
    })
  }
})

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post('/login', async (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body)
  const email = req.body.email
  const password = req.body.password
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const user = await User.findOne({
    email
  })
  // Check for user
  if (!user) {
    errors.email = 'User not found'
    return res.json({
      result: 'fail',
      status: 404,
      errors,
    })
  }
  // Check PassWord
  const check = await bcrypt.compare(password, user.password)
  if (check) {
    // User match
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    } //  Create jwt payload
    // Sign Token
    jwt.sign(payload, keys.secretOrKey, {
      expiresIn: 3600000000
    }, (err, token) => {
      res.json({
        success: true,
        token: `Bearer ${token}`
      })
    })
  } else {
    errors.password = 'Password incorect'
    return res.json({
      result: 'fail',
      status: 404,
      errors,
    })
  }
})

// @route   GET api/users/current
// @desc    Return current User
// @access  Private

router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json(req.user)
})


module.exports = router;