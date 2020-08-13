const express = require('express');
const router = express.Router();

console.log('Router Loaded');

const homeController = require('../controllers/home_controller');
const { route } = require('./posts');
router.get('/', homeController.home);

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

module.exports = router;