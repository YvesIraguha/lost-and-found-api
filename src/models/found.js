const mongoose = require('mongoose');
const Joi = require('@hapi/joi');



const foundSchema = new mongoose.Schema({
    docName:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    sector:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    isRewarded: Boolean,
    price:{
        type:Number,
        required:function(){ return this.isRewarded},
    }
   
});
const FoundItem = mongoose.model('FoundItem', foundSchema);

function validateItem(item){
    const Schema= Joi.object().keys({
        docName: Joi.string().min(5).max(50).required(),
        district: Joi.string().min(4).max(50).required(),
        sector: Joi.string().min(3).max(50).required(),
        description:Joi.string().min(5).max(250).required(),
        category:Joi.string().min(5).max(50).required(),
        isRewarded:Joi.boolean(),
        price:Joi.string().required()

    })
    return item
};

module.exports.FoundItem = FoundItem;
module.exports.validate = validateItem;