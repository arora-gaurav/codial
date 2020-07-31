const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authenticate using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        //Find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// Serialize the user to decide which user is to be kept inside the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// Deserializing the user from the key in cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    })
});

module.exports = passport;