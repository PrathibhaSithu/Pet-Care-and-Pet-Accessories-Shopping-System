const asyncHandler = require('express-async-handler');

const Cart = require('../models/cartModel')


// @desc    Fetch all carts
// @route   GET /api/carts
// @access  Private/Admin
const getCarts = asyncHandler(async (req, res) => {

    const carts = await Cart.find();
    
    res.status(200).json(carts);

})
  
// @desc    Fetch logged in user cart
// @route   GET /api/carts/:id
// @access  Private
const getMyCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId })
  
    if (cart) {
        res.status(200).json(cart)
    } else {
        res.status(404)
        throw new Error('Cart not found')
    }
})
  
// @desc    Create cart
// @route   POST /api/carts
// @access  Private
const createCart = asyncHandler(async (req, res) => {
    
    const { products } = req.body;

    const cart = new Cart({
        user: req.user._id,
        products
    })

    const savedCart = await cart.save();

    res.status(200).json(savedCart); 
})
  
// @desc    Update cart
// @route   PUT /api/carts/:id
// @access  Private
const updateCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findById(req.params.id)
  
    if (cart) {
  
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedCart)

    } else {
        res.status(404)
        throw new Error('Cart not found')
    }
  })

// @desc    Delete cart
// @route   DELETE /api/carts/:id
// @access  Private
const deleteCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id)
  
    if (cart) {
        await cart.deleteOne();
        res.status(200).json({message: 'Cart removed'})
    } else {
        res.status(404)
        throw new Error('Cart not found')
    }
})

module.exports = {getCarts, getMyCart, createCart, updateCart, deleteCart}