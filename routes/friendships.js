const express = require('express');
const router = express.Router();

const friendshipController = require('../controllers/friendships_controller');

router.post('/toggle', friendshipController.toggleFriendship);

module.exports = router;