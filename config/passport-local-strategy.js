const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authenticate using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        //Find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            console.log("USER IS",user);
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
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

// Check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(Controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.users contains the current signed in user from the session cookie and we are just sending it from the cookie to locals
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;