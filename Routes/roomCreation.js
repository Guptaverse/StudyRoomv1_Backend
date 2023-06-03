const express = require('express')
const { createRoom, findRoom } = require('../Controllers/roomCreation')
const { getUserData, getRoomData, joinRoom } = require('../Controllers/roomCreation')

const router = express.Router()

router.route('/createRoom').post(createRoom)
// router.route('/find').post(findRoom)
router.route('/find').post(getRoomData);
router.route('/me').post(getUserData);
router.route('/joinRoom').post(joinRoom);

module.exports = router;


