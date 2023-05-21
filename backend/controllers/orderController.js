const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const Order = require('../models/orderModel')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, amount, address, status} = req.body
  
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            amount,
            address,
            status
        })
  
      const createdOrder = await order.save()
  
      res.status(201).json(createdOrder)
    }
})
  
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'username email'
    )
  
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})
  

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true, 
        });
    
        res.status(200).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})
  
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json(orders)
})
  
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {

    const qSearch = req.query.search;

    let orders;

    if (qSearch) {
        orders = await Order.find({
            $text: { $search: qSearch }
        }).populate('user', 'id username');
    } else {
        orders = await Order.find({}).populate('user', 'id username');
    }

    res.status(200).json(orders)
})
  

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
        await order.deleteOne();
        res.status(200).json({message: 'Order removed'})
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @desc    Get monthly income
// @route   GET /api/orders/insights/montlyIncome
// @access  Private/Admin
const getMonthlyIncome = asyncHandler(async (req, res) => {
    
    // Create a new Date object representing the current date and time
    const date = new Date();

    // Create a new Date object representing the last month by setting the month of the current date to the previous month
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));

    // Create a new Date object representing the month before the last month by setting the month of the last month to the month before that
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    // Use the Mongoose aggregation pipeline to retrieve the total sales income for each month in the previous two months
    const income = await Order.aggregate([
        // Only consider orders created after the start of the previous month
        { $match: { createdAt: { $gte: previousMonth } } },
        // Project a new field 'month' that extracts the month from the 'createdAt' field, and rename the 'amount' field to 'sales'
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$total",
            },
        },
        // Group the orders by month, and calculate the total sales income for each month
        { 
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);

    res.status(200).json(income);

})

// @desc    Get yearly income
// @route   GET /api/orders/insights/yearlyIncome
// @access  Private/Admin
const getYearlyIncome = asyncHandler(async (req, res) => {

    // Define an array of month names
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Create a new Date object representing the current date and time
    const currentDate = new Date();

    // Create a new Date object representing the start of the current year
    const currentYearStart = new Date(currentDate.getFullYear(), 0, 1);

    // Use the Mongoose aggregation pipeline to retrieve the total sales income for each month in the current year
    const income = await Order.aggregate([
        // Only consider orders created after the start of the current year
        { $match: { createdAt: { $gte: currentYearStart } } },
        // Project a new field 'month' that extracts the month from the 'createdAt' field, and rename the 'amount' field to 'sales'
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$total",
            },
        },
        // Group the orders by month, and calculate the total sales income for each month
        {
            $group: {
                _id: "$month",
                Income: { $sum: "$sales" },
            },
        },
        // Add a new field 'name' that maps the month value to the corresponding name from the monthNames array
        {
            $addFields: {
                name: { $arrayElemAt: [monthNames, { $subtract: ["$_id", 1] }] },
            },
        },
        { $sort: { _id: 1 } }, // Sort by month in ascending order
    ]);

    res.status(200).json(income);

});

// @desc    Get daily order count for the last month
// @route   GET /api/orders/insights/dailyOrderCount
// @access  Private/Admin
const getDailyOrderCount = asyncHandler(async (req, res) => {

    // Calculate the start date for one month ago
    const oneMonthAgoStartDate = new Date();
    oneMonthAgoStartDate.setMonth(oneMonthAgoStartDate.getMonth() - 1);
  
    // Use the Mongoose aggregation pipeline to retrieve the daily order count for the last month
    const orderCount = await Order.aggregate([
        // Only consider orders created within the last month
        { $match: { createdAt: { $gte: oneMonthAgoStartDate } } },
        // Group the orders by date and calculate the count of orders for each date
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                Orders: { $sum: 1 },
            },
        },
        // Sort by date in ascending order
        { $sort: { _id: 1 } },
    ]);
  

    const currentDate = new Date();
    const dates = [];

    for (let date = oneMonthAgoStartDate; date <= currentDate; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
    }

    // Lookup the original data and set the count to 0 for missing dates
    const updatedOrderCount = dates.map((date) => {

        const formattedDate = date.toISOString().split("T")[0];
        const matchingOrder = orderCount.find((order) => order._id === formattedDate);

        if (matchingOrder) {
            return matchingOrder;
        } else {
            return { _id: formattedDate, Orders: 0, name: date.getDate() };
        }

    });

    res.status(200).json(updatedOrderCount);
});

// @desc    Get total order count and total amount
// @route   GET /api/orders/insights/totalOrderCount
// @access  Private/Admin
const getOrderStats = asyncHandler(async (req, res) => {
    // Fetch all orders
    const orders = await Order.find();
  
    // Calculate the total order count
    const totalOrders = orders.length;
  
    // Calculate the total amount
    const totalAmount = orders.reduce((acc, order) => acc + order.total, 0);
  
    res.status(200).json({ totalOrders, totalAmount });
});

// @desc    Get product income by id
// @route   GET /api/orders/insights/productIncome/:id
// @access  Private/Admin
const getProductIncome = asyncHandler(async (req, res) => {
    
    const id = req.params.id;

    // Convert the id string to a Mongoose ObjectId
    const productId = new mongoose.Types.ObjectId(id);

    // Define an array of month names
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Create a new Date object representing the current date and time
    const currentDate = new Date();

    // Create a new Date object representing the start of the current year
    const currentYearStart = new Date(currentDate.getFullYear(), 0, 1);

    // Use the Mongoose aggregation pipeline to retrieve the total sales income for each month in the current year
    const income = await Order.aggregate([
        // Unwind the orderItems array to deconstruct it into separate documents
        { $unwind: "$orderItems" },
        // Only consider orders created after the start of the current year and with product IDs in the provided array
        { $match: { createdAt: { $gte: currentYearStart }, 'orderItems.productId': productId } },
        // Project a new field 'month' that extracts the month from the 'createdAt' field, and rename the 'amount' field to 'sales'
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$orderItems.productTotal",
            },
        },
        // Group the orders by month, and calculate the total sales income for each month
        {
            $group: {
                _id: "$month",
                Income: { $sum: "$sales" },
            },
        },
        // Add a new field 'name' that maps the month value to the corresponding name from the monthNames array
        {
            $addFields: {
                name: { $arrayElemAt: [monthNames, { $subtract: ["$_id", 1] }] },
            },
        },
        { $sort: { _id: 1 } }, // Sort by month in ascending order
    ]);

    res.status(200).json(income);
});

module.exports = {
    createOrder,
    getOrderById,
    updateOrder,
    getMyOrders,
    getOrders,
    deleteOrder,
    getMonthlyIncome,
    getYearlyIncome,
    getDailyOrderCount,
    getOrderStats,
    getProductIncome
}