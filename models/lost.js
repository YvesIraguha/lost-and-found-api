const mongoose = require('mongoose');

const lostSchema = mongoose.Schema({
    documentType:{
        type: String,
        required: true
    },
    documentNumber: {
        type: Number,
    },
    owner:{
        fullName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    isRewarded:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Lost', lostSchema);