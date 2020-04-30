const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    secondName:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true,
        min: 6
    },
    email:{
        type:String,
        required: true,
        max: 25,
    },
    phoneNumber:{
        type: Number,
        required: true,
        min: 10,
    },
    password:{
        type: String,
        required:true,
        min:6,
        max:256,
    },
    date:{
       type: Date,
       default: Date.now
    }
});


module.exports = mongoose.model('user', userSchema);