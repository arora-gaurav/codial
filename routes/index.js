const express = require('express');
const router = express.Router();

console.log('Router Loaded');

const homeController = require('../controllers/home_controller');
// const { route } = require('./posts');
router.get('/', homeController.home);

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.use('/friendships', require('./friendships'));

router.use('/api', require('./api'));

module.exports = router;