const mongoose = require('mongoose')

const releaseItemSchema = mongoose.Schema({

    releaseRecord:{
        type: String,
        required: true
    },

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

    quantity:{
        type: Number,
        required: true
    },

    totalCost:{
        type: Number,
        required: true
    },

    staffName:{
        type: String,
        required: true
    },

    staffID:{
        type:String,
        required: true
    },

    measurementUnit:{
        type:String,
        required: true
    },

},{timestamps:true})


module.exports = mongoose.model('releaseItem',releaseItemSchema)