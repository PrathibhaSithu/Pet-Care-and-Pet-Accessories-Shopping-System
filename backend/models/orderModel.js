const mongoose = require("mongoose");
const Counter = require('./counterModel');

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            productName: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            unitPrice: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            productTotal: {
                type: Number,
                required: true,
            },
        }
    ],
    subTotal: {
        type: Number,
        required: true
    },
    shippingAmount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    shipping: {
        type: Object,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    deliveryStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    assignedDriver: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

orderSchema.index({
    orderId: 'text',
});

// Before saving the order, check if it has a orderId, if not, generate one
orderSchema.pre('save', async function (next) {

    try {
        const doc = this; // Get reference to the document being saved

        // Check if the document has a orderId
        if (!doc.orderId) { 

        // If there's no orderId, fetch the counter from the counters collection and increment it
        const counter = await Counter.findOneAndUpdate(
            { _id: 'orderId' }, // The counter document has _id 'orderId'
            { $inc: { seq: 1 } }, // Increment the seq field by 1
            { new: true, upsert: true } // Create the counter document if it doesn't exist
        );

        // Generate the new orderId using the incremented seq value from the counter
        doc.orderId = `ORD${counter.seq.toString().padStart(4, '0')}`;
        }

        return next(); // Call the next middleware in the chain
    } catch (err) {
        return next(err); // Pass any errors to the error handler middleware
    }
});


module.exports = mongoose.model('Order', orderSchema);
