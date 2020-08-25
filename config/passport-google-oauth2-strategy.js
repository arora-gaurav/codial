const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "375402340226-uv5i6inou4e34qvb6vk0b7hsn7i71ft3.apps.googleusercontent.com",
    clientSecret: "saqSQB9VHKJt7eKpartd2_Dq",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        //Find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in google strategy-passport', err);
                return;
            }
            console.log(profile);
            if(user){
                // If found, set this user as req.user
                return done(null, user);
            } else {
                //If not found, create the user and set it as req.user
                User.create({
                    user: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log('error in creating user google strategy-password', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        })

    }
))