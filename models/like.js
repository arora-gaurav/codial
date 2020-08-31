const mongoose = require('mongoose');

let likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // This defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    }, 
    // This field is used for defining the type of linked object since this is dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;