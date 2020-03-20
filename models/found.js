const mongoose = require('mongoose');

const foundSchema = mongoose.Schema({
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
        }
    },
    whoFound: {
        fullName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    location: {
        type: String,
        required: true
    },
    requireReward: {
        type: Boolean,
        required: true,
        default: false
    }

});

module.exports = mongoose.model('Found', foundSchema);