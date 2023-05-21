const mongoose = require("mongoose");
const Counter = require('./counterModel');

const appointmentSchema = mongoose.Schema({
    appointmentId: {
        type: String,
        unique: true,
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerContact: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    petAge: {
        type: Number,
        required: true
    },
    petSpecies: {
        type: String,
        required: true
    },
    petGender: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    additionalNote: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
    },
    vet: {
        type: String,
    }
}, {
    timestamps: true
})

// Before saving the appointment, check if it has a appointmentId, if not, generate one
appointmentSchema.pre('save', async function (next) {

    try {
        const doc = this; // Get reference to the document being saved

        // Check if the document has a appointmentId
        if (!doc.appointmentId) { 

        // If there's no appointmentId, fetch the counter from the counters collection and increment it
        const counter = await Counter.findOneAndUpdate(
            { _id: 'appointmentId' }, // The counter document has _id 'appointmentId'
            { $inc: { seq: 1 } }, // Increment the seq field by 1
            { new: true, upsert: true } // Create the counter document if it doesn't exist
        );

        // Generate the new appointmentId using the incremented seq value from the counter
        doc.appointmentId = `APT${counter.seq.toString().padStart(4, '0')}`;
        }

        return next(); // Call the next middleware in the chain
    } catch (err) {
        return next(err); // Pass any errors to the error handler middleware
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
