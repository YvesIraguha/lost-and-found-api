const mongoose = require('mongoose');
const Joi = require('@hapi/joi');



const foundSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
   
});
const FoundItem = mongoose.model('FoundItem', foundSchema);

function validateItem(item){
    const Schema= Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        description:Joi.string().min(5).max(250).required(),
        category:Joi.string().min(5).max(50).required(),

    })
    return item
};

module.exports.FoundItem = FoundItem;
module.exports.validate = validateItem;