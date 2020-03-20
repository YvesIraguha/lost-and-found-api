const mongoose = require('mongoose');

const deliveredSchema = mongoose.Schema({
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
    isRewarded:{
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Delivered', deliveredSchema);