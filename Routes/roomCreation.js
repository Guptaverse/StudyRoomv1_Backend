const express = require('express')
const { createRoom, findRoom } = require('../Controllers/roomCreation')
const router = express.Router()

router.route('/createRoom').post(createRoom)
router.route('/find').post(findRoom)

module.exports = router;


