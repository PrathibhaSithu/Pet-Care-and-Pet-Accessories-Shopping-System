const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const retrieveOrders = asyncHandler(
    async(req,res) => {
        const orders = await Order.find({}).sort({ createdAt: -1 })
        res.status(200).json(orders)
    }
)


const retrieveSpecificOrder = asyncHandler(
    async(req,res) => {
        const orderID = req.params.id;
        const selectedOrder = await Order.find({ orderId: orderID });
        // const selectedOrder = await Order.findById();

        if (selectedOrder.length !== 0) {
            res.status(200).json(selectedOrder);
        } else {
            res.status(404).json({ message: "order not found" });
        }
    }
)


const retrieveSpecificOrderUsinMongo = asyncHandler(
    async(req,res) => {
        const orderID = req.params.id;
        const selectedOrder = await Order.findById(orderID);

        if (selectedOrder) {
            res.status(200).json(selectedOrder);
        } else {
            res.status(404).json({ message: "order not found" });
        }
    }
)

const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
        const updatedProduct = await Order.findByIdAndUpdate(order._id, { $set: req.body },{ 
            new: true, 
        });
    
        res.status(200).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})



module.exports = {retrieveOrders ,retrieveSpecificOrder, updateOrder , retrieveSpecificOrderUsinMongo}