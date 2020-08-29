const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication , usersController.profile);
router.post('/update/:id', passport.checkAuthentication , usersController.update);

router.get('/sign-in', usersController.sign_in);
router.get('/sign-up', usersController.sign_up);

router.post('/create', usersController.create);
// Use passport as a middleware to authenticatea

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);                                                        

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

router.get('/forget_password', usersController.forgetPassword);
router.post('/reset-password', usersController.resetPassword);

router.get('/changePassword', usersController.changePassword);
router.post('/save-password/:id', usersController.savePassword);

module.exports = router;