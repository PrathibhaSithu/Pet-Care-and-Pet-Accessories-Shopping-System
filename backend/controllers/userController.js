const asyncHandler = require('express-async-handler');

const User = require('../models/userModel')

const { generateToken } = require('../utils/generateToken')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
  
    //Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
  
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
  
    //Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = new User({ username, email, password});

    const savedUser = await user.save();

    if (savedUser) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
})
  
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
  
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        
        if (req.body.password) {
            user.password = req.body.password
        }
    
        const updatedUser = await user.save()
    
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
  
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})
  
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
        await user.deleteOne()
        res.status(200).json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
  
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
  
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private/Admin
const getUserStats = asyncHandler(async (req, res) => {

    // Create a new Date object to represent the current date and time
    const date = new Date()
    // Subtract one year from the current date to get the date from last year
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    // Use the MongoDB aggregate function to perform a series of operations on the User collection
    const data = await User.aggregate([
    {
        // Filter documents to only include those where the 'createdAt' field is greater than or equal to 'lastYear'
        $match: { createdAt: { $gte: lastYear } } 
    },
    {
        // Project a new field called 'month' that contains the month of the 'createdAt' field
        $project: { month: { $month: "$createdAt" } }
    },
    {
        // Group documents by the 'month' field and calculate a count of documents for each month
        $group: { _id: "$month", total: { $sum: 1 } }
    },
    ])
    
    res.status(200).json(data)

})

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById, 
    updateUser,
    getUserStats
}