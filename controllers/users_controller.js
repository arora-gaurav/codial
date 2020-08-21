
const User = require('../models/user');
 const { user } = require('../routes');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err,user){
        return res.render('users_profile', {
            title: 'Profile Page',  
            profile_user: user
        })
    })
    
}

module.exports.update = function(req, res){
    if(req.params.id ==  req.user.id){
        // Simply pass req.body if it has same name and email in user also, but since i mistakenly used user instead of name, so write explicitly
         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        })
    } else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.sign_in = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/'); 
    }
    return res.render('user_sign_in', {
        title: 'Codial | Sign In'
    });
}

module.exports.sign_up = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: 'Codial | Sign Up'
    });
}

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
    req.flash('success', 'Logged in Successfully');

    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}