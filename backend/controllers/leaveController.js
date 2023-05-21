const asyncHandler = require('express-async-handler');

const Leave = require('../models/leaveModel')


// @desc    Fetch all leaves
// @route   GET /api/leaves
// @access  Private/Admin
const getLeave = asyncHandler(async (req, res) => {
    //const leaves = await Leave.find();
    const qSearch = req.query.search

    let leaves
    if(qSearch){
        leaves= await Leave.find(
            {
                $text:{$search:qSearch}
            }
        )
    }
    else{
        leaves = await Leave.find();
    }
    
     res.status(200).json(leaves);

})
  
// @desc    Fetch logged in user leave
// @route   GET /api/leaves/:id
// @access  Private
const getLeaveById = asyncHandler(async (req, res) => {
    const leave = await Leave.findById(  req.params.id )
  
    if (leave) {
        res.status(200).json(leave)
    } else {
        res.status(404)
        throw new Error('Leave member not found')
    }
})
  
// @desc    Create leave
// @route   POST /api/leaves
// @access  Private
const addLeave = asyncHandler(async (req, res) => {
    
    const { staffId, leaveType, reason, leaveFrom, leaveTo} = req.body;

    const leave = new Leave({
        staffId: req.body.staffId,
        leaveType: req.body.leaveType,
        reason: req.body.reason,
        leaveFrom: req.body.leaveFrom,
        leaveTo: req.body.leaveTo,

    })

    const savedLeave = await leave.save();

    res.status(200).json(savedLeave); 
})
  
// @desc    Update leave
// @route   PUT /api/leaves/:id
// @access  Private
const updateLeave = asyncHandler(async (req, res) => {

    const leave = await Leave.findById(req.params.id)
  
    if (leave) {
  
        const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedLeave)

    } else {
        res.status(404)
        throw new Error('leave Member not found')
    }
  })

// @desc    Delete leave
// @route   DELETE /api/leaves/:id
// @access  Private
const deleteLeave = asyncHandler(async (req, res) => {
    const leave = await Leave.findById(req.params.id)
  
    if (leave) {
        await leave.deleteOne();
        res.status(200).json({message: 'Leave member removed'})
    } else {
        res.status(404)
        throw new Error('Leave member not found')
    }
})

module.exports = {getLeave, getLeaveById, addLeave, updateLeave, deleteLeave}