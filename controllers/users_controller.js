
const User = require('../models/user');
const ResetPassToken = require('../models/reset_pass_token');
//  const { user } = require('../routes');
const crypto = require('crypto');

const queue = require('../config/kue');
const accessTokenEmailWorker = require('../workers/access_token_email_worker');

const fs =require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err,user){
        return res.render('users_profile', {
            title: 'Profile Page',  
            profile_user: user
        })
    })
    
}

module.exports.update = async function(req, res){
    
    // if(req.params.id ==  req.user.id){
    //     // Simply pass req.body if it has same name and email in user also, but since i mistakenly used user instead of name, so write explicitly
    //      User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     })
    // } else {
    //     req.flash('error', 'Unauthorized');
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.params.id ==  req.user.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('***** Multer Error: ', err);
                }
                user.user = req.body.user;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // This is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        } catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized');
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

module.exports.forgetPassword = function(req, res){
    return res.render('forget_password', {
        title: 'Codial | Forget Password'
    })
}

module.exports.resetPassword = async function(req, res){
    let resetToken;
    try{
        let user = await User.findOne({email: req.body.email});
        resetToken = await ResetPassToken.create({
            accessToken: crypto.randomBytes(20).toString('hex'),
            user: user._id,
            isValid: true
        });
        resetToken = await resetToken.populate('user', 'user email').execPopulate();
    } catch(err){
        console.log('Error', err);
    }
    let job = queue.create('resetPasswords', resetToken).save(function(err){
        if(err){
            console.log('error in sending job to queue', err);
            return;
        }
        console.log('job enqueued', job.id);
    });  
    req.flash('success', 'Reset-Password link send to email');
    res.redirect('back');
}

module.exports.changePassword = async function(req, res){
    let resetToken = await ResetPassToken.findOne({accessToken: req.query.accessToken});
    if(resetToken && resetToken.isValid){
        resetToken.isValid = false;
        return res.render('reset_password', {
            title: 'Change Password',
            resetToken: resetToken
        });
    } else {
        console.log('Error in validating access token');
        return;
    }
}

module.exports.savePassword = function(req, res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', "Re-enter Password and Confirm Password");
        return res.redirect('back');
    }
    User.findByIdAndUpdate(req.params.id, {password: req.body.password}, function(err, user){
        if(err){
            console.log('Error in updating user', err);
            return;
        }
        if(user){
            req.flash('success', 'Password changed successfully');
            return res.redirect('/users/sign-in');
        }
    });
    
}