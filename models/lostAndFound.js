const mongoose = require('mongoose');

const foundSchema = mongoose.Schema({
    documentType:{
        type: String,
        required: true
    },
    documentNumber: {
        type: String
    },
    owner:{
        fullName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
        },
        email: {type: String}
    },
    whoFound: {
        fullName: {
            type: String,
        },
        phoneNumber: {
            type: String,
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