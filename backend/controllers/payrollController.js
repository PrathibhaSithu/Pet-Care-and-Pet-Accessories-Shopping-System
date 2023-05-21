const asyncHandler = require('express-async-handler');

const Payroll = require('../models/payrollModel')


// @desc    Fetch all payrolls
// @route   GET /api/payrolls
// @access  Private/Admin
const getPayroll = asyncHandler(async (req, res) => {
    const qSearch = req.query.search
    let payrolls
    if(qSearch){
        payrolls= await Payroll.find(
            {
                $text:{$search:qSearch}
            }
        )
    }
    else{
        payrolls = await Payroll.find();
    }

    
    
    res.status(200).json(payrolls);

})
  
// @desc    Fetch logged in user payroll
// @route   GET /api/payrolls/:id
// @access  Private
const getPayrollById = asyncHandler(async (req, res) => {
    const payroll = await Payroll.findById( req.params.id )
  
    if (payroll) {
        res.status(200).json(payroll)
    } else {
        res.status(404)
        throw new Error('Payroll details not found')
    }
})
  
// @desc    Create payroll
// @route   POST /api/payrolls
// @access  Private
const addPayroll = asyncHandler(async (req, res) => {
    
    const { staffId, otHours, salary, paymentStatus, date} = req.body;

    const payroll = new Payroll({
        
        staffId: req.body.staffId,
        otHours:req.body.otHours,
        salary: req.body.salary,
        paymentStatus: req.body.paymentStatus,
        date: req.body.date,

    })

    const savedPayroll = await payroll.save();

    res.status(200).json(savedPayroll); 
})
  
// @desc    Update payroll
// @route   PUT /api/payrolls/:id
// @access  Private
const updatePayroll = asyncHandler(async (req, res) => {

    const payroll = await Payroll.findById(req.params.id)
  
    if (payroll) {
  
        const updatedPayroll = await Payroll.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedPayroll)

    } else {
        res.status(404)
        throw new Error('payroll details not found')
    }
  })

// @desc    Delete payroll
// @route   DELETE /api/payrolls/:id
// @access  Private
const deletePayroll = asyncHandler(async (req, res) => {
    const payroll = await Payroll.findById(req.params.id)
  
    if (payroll) {
        await payroll.deleteOne();
        res.status(200).json({message: 'payroll details removed'})
    } else {
        res.status(404)
        throw new Error('payroll details not found')
    }
})

module.exports = {getPayroll, getPayrollById, addPayroll, updatePayroll, deletePayroll}