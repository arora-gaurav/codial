const  mongoose = require('mongoose');
const User = require('./user');

const resetPassTokenSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isValid: {
        type: Boolean,
        required: true,
        default: true
    }
},{
    timestamps: true
});

const ResetPassToken = mongoose.model('ResetPassToken', resetPassTokenSchema);

module.exports = ResetPassToken;