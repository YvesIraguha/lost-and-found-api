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
        },
        email: {type: String}
    },
    whoFound: {
        fullName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {type: String}
    },
    location: {
        lostPlace: {
            type: String
        },
        pickingPlace: {type: String}
    },
    status: {
        isLost: {
            type: Boolean
        },
        isFound: {
            type: Boolean
        },
        isDelivered:{
            type: Boolean
        }
    },
    requireReward: {
        type: Boolean,
        required: true,
        default: false
    }

});

module.exports = mongoose.model('LostDocuments', foundSchema);