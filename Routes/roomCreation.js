const express = require('express')
const { createRoom, findRoom, uploadMarks, getRoomLeaderboard } = require('../Controllers/roomCreation')
const { getUserData, getRoomData, joinRoom } = require('../Controllers/roomCreation')

const router = express.Router()

router.route('/createRoom').post(createRoom)
router.route('/find').post(getRoomData);
router.route('/leaderboard').post(getRoomLeaderboard);
router.route('/me').post(getUserData);
router.route('/joinRoom').post(joinRoom);
router.route('/uploadmarks').post(uploadMarks);

module.exports = router;
