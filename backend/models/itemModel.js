const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    sku:{
        type: String,
        required: true
    },

    itemName:{
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    rackNo:{
        type: String,
        required: true
    },

    quantity:{
        type: Number,
        required: true
    },

    manufacturer:{
        type: String,
        required: true
    },

    reorderLevel:{
        type:Number,
        required: false
    },

    measurementUnit:{
        type:String,
        required: true
    },

    productImage:{
        type:String,
        required: true
    }

},{timestamps:true})


module.exports = mongoose.model('item',itemSchema)