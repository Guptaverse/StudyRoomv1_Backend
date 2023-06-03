const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { login, register } = require('../Controllers/auth')


// /auth/login+post
router.route('/login').post(login)
router.route('/register').post(register)



module.exports = router;