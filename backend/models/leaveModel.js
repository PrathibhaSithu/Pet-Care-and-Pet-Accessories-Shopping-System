const mongoose = require("mongoose");


const leaveSchema = mongoose.Schema({
    
    staffId: {
        type: String,
        unique: true,
    },
    leaveType: {
        type: String,
        required: [true, 'Please add leave type']
    },
    reason: {
        type: String,
        required: [true, 'Please add reason']
    },
    leaveFrom: {
        type: String,
        required: [true, 'Please add leave date']
    },
    leaveTo: {
        type: String,
        required: [true, 'Please add leaving field']
    }

}, {
    timestamps: true
})

leaveSchema.index({
    staffId: 'text',
    leaveType: 'text',
    reason: 'text',
    leaveFrom: 'text',
    leaveTo: 'text'
})

module.exports = mongoose.model('Leave', leaveSchema);
