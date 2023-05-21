const mongoose = require("mongoose");



const serviceSchema = mongoose.Schema({
    serviceId: {
        type: String,
        unique: true,
    },
    serviceName: {
        type: String,
        required: [true, 'Please add service name']
    },
    serviceCharge: {
        type: Number,
        required: [true, 'Please add service charge']
    },
    serviceDescription: {
        type: String,
        required: [true, 'Please add service description']
    },
    
    serviceImage: {
        type: String,
        required: [true, 'Please add service image']
    }
}, {
    timestamps: true
})
serviceSchema.index({
    serviceId:'text',
    serviceName:'text'
})




module.exports = mongoose.model('Service', serviceSchema);
