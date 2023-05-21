const mongoose = require("mongoose");
const Counter = require('./counterModel');

const serviceRecordSchema = mongoose.Schema({
    
    recordId: {
        type: String,
        unique: true,
    },
    serviceName: {
        type: String,
        required: [true, 'Please add service Name'],
        ref: 'Service'
    },
    customerName: {
        type: String,
        required: [true, 'Please add customer Name']
    },
    vetName: {
        type: String,
        required: [true, 'Please add vet Name']
        
    },
    petType: {
        type: String,
        required: [true, 'Please add pet Type']
    },
    date: {
        type: String,
        required: [true, 'Please add date']
    },
    
    serviceCharge: {
        type: Number,
        required: [true, 'Please add service charge']
    }
}, {
    timestamps: true
})

serviceRecordSchema.index({
    recordId: 'text',
    serviceName:'text',
    petType:'text'
})

// // Before saving the service record, check if it has a recordId, if not, generate one
serviceRecordSchema.pre('save', async function (next) {

     try {
        const doc = this; // Get reference to the document being saved

//         // Check if the document has a recordId
      if (!doc.recordId) { 

//         // If there's no recordId, fetch the counter from the counters collection and increment it
        const counter = await Counter.findOneAndUpdate(
             { _id: 'recordId' }, // The counter document has _id 'recordId'
             { $inc: { seq: 1 } }, // Increment the seq field by 1
             { new: true, upsert: true } // Create the counter document if it doesn't exist
        );

//         // Generate the new recordId using the incremented seq value from the counter
         doc.recordId = `RE${counter.seq.toString().padStart(4, '0')}`;
         }

        return next(); // Call the next middleware in the chain
       } catch (err) {
        return next(err); // Pass any errors to the error handler middleware
      }
 });




module.exports = mongoose.model('ServiceRecord', serviceRecordSchema);
