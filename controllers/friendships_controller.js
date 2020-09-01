const User = require('../models/user');
const Friendship = require('../models/friendship');


module.exports.toggleFriendship = async function(req, res){
    try{
        let removed = false;
        let from_user = await User.findById(req.user._id);
        let to_user = await User.findById(req.query.to);

        let existingFriend1 = await Friendship.findOne({
            $or: [
                {
                    from_user: req.user._id,
                    to_user: req.query.to
                },
                {
                    from_user: req.query.to,
                    to_user: req.user._id
                }
            ]
        });
        console.log('Existing is',existingFriend1);
        if(existingFriend1){
            from_user.friendships.pull(existingFriend1._id);
            from_user.save();
            to_user.friendships.pull(existingFriend1._id);
            to_user.save();
            existingFriend1.remove();
            removed= true;
        } else {
            let newFriendship = await Friendship.create({
                from_user: req.user._id,
                to_user: req.query.to
            });
            from_user.friendships.push(newFriendship._id);
            from_user.save();
            to_user.friendships.push(newFriendship._id);
            to_user.save();
        }
        return res.json(200, {
            message: "Request Successful!",
            data: {
                removed: removed
            }
        })
        // let existingFriend2 = await Friendship.findOne({
        //     from_user: req.query.to,
        //     to_user: req.user._id
        // });
        // if(existingFriend1 || existingFriend2){

        // }
    } catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}

