const User = require("../models/user");
const Post = require('../models/post');

module.exports.home = async function(req, res){
    try{
        //Populate the user of each post
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        options: {
            sort: {
                'createdAt': -1
            }
        },
        populate: {
            path: 'user'
        }   
    });
    let users = await User.find({});  
    return res.render('home', {
        title: 'Codial | Home',
        posts: posts,
        all_users: users
    });
    } catch(err){
        console.log('Error', err);
        return;
    }
}

// module.exports.home = function(req, res){
//     // res.cookie('something', 'RAM');

//     // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: 'Codial | Home',
//     //         posts: posts
//     //     });
//     // });

//     //Populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }   
//     })
//     .exec(function(err, posts){
//         User.find({}, function(err,users){
//             return res.render('home', {
//                 title: 'Codial | Home',
//                 posts: posts,
//                 all_users: users
//             });
//         })    
//     });
// }


// Using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();
// posts.then();