const mongoose = require("mongoose");


const petTreatmentsSchema = mongoose.Schema({
    petID: {
        type: String,
        required: [true, 'Please add petID'],
    },
    petName: {
        type: String,
        required: [true, 'Please add pet Name'],
    },
    nic: {
        type: String,
        required: [true, 'Please add NIC']
    },
    
    date: {
        type: String,
        required: [true, 'Please add date']
    },
    treatment: {
        type: String,
        required: [true, 'Please add treatment']
    },
    progressNotes:{
        type: String,
        required: [true, 'Please add progressNotes']
   }
}, {
    timestamps: true
})

petTreatmentsSchema.index({   
    petID:'text',
    petName:'text',
    nic:'text',
    date:'text',
    treatment:'text',
    progressNotes:'text'
})

module.exports = mongoose.model('PetTreatments', petTreatmentsSchema);
