
const User = require('../models/user');
 const { user } = require('../routes');

module.exports.profile = function(req, res){
    return res.render('users_profile', {
        title: 'Profile Page'
    })
}

module.exports.sign_in = function(req, res){
    return res.render('user_sign_in', {
        title: 'Codial | Sign In'
    });
}

module.exports.sign_up = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codial | Sign Up'
    });
}
//bro its 
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding out the user in db');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating the user in db');
                    return;
                }
                console.log('*********************', user);
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    });
}

// Sign-in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}