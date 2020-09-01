const mongoose = require('mongoose');
const { model } = require('./user');

let friendshipSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

let Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;