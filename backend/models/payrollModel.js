const mongoose = require("mongoose");


const payrollSchema = mongoose.Schema({
   
    staffId: {
        type: String,
        unique: true,
    },
    otHours:{
        type: Number,
        required: [true, 'Please add OT hours']
    },
    salary: {
        type: Number,
        required: [true, 'Please add salary']
    },
    paymentStatus: {
        type: String,
        required: [true, 'Please add status']
    },
    date: {
        type: String,
        required: [true, 'Please add date']
    }

}, {
    timestamps: true
})

payrollSchema.index({
    staffId: 'text',
    paymentStatus: 'text',
    date: 'text'
})




module.exports = mongoose.model('Payroll', payrollSchema);
