const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
    medicineName: {
        type: String,
        unique: [true, 'Please add medicine name'],
    },
    uses: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

medicineSchema.index({
    medicineName: 'text',
    uses: 'text'
})

module.exports = mongoose.model('Medicine', medicineSchema);
