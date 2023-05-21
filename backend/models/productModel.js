const mongoose = require("mongoose");
const Counter = require('./counterModel');

const productSchema = mongoose.Schema({
    productId: {
        type: String,
        unique: true,
    },
    productName: {
        type: String,
        required: [true, 'Please add product name']
    },
    brand: {
        type: String,
        required: [true, 'Please add product brand']
    },
    categories: {
        type: Object,
        required: [true, 'Please add category']
    },
    quantity: {
        type: Number,
        required: [true, 'Please add product quantity']
    },
    price: {
        type: Number,
        required: [true, 'Please add product price']
    },
    description: {
        type: String,
        required: [true, 'Please add product description']
    },
    SKU: {
        type: String,
        required: true,
        unique: true,
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true,
    },
    image: {
        type: String,
        required: [true, 'Please add product image']
    }
}, {
    timestamps: true
})

productSchema.index({
    productId: 'text',
    productName: 'text',
    brand: 'text',
    categories: 'text',
    description: 'text',
    SKU: 'text'
});

// Before saving the product, check if it has a productId, if not, generate one
productSchema.pre('save', async function (next) {

    try {
        const doc = this; // Get reference to the document being saved

        // Check if the document has a productId
        if (!doc.productId) { 

        // If there's no productId, fetch the counter from the counters collection and increment it
        const counter = await Counter.findOneAndUpdate(
            { _id: 'productId' }, // The counter document has _id 'productId'
            { $inc: { seq: 1 } }, // Increment the seq field by 1
            { new: true, upsert: true } // Create the counter document if it doesn't exist
        );

        // Generate the new productId using the incremented seq value from the counter
        doc.productId = `P${counter.seq.toString().padStart(4, '0')}`;
        }

        // Set inStock to false if quantity is less than 0
        if (doc.quantity < 0) {
            doc.inStock = false;
        }

        return next(); // Call the next middleware in the chain
    } catch (err) {
        return next(err); // Pass any errors to the error handler middleware
    }
});

module.exports = mongoose.model('Product', productSchema);
