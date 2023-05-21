const asyncHandler = require('express-async-handler');

const Medicine = require('../models/medicineModel')


// @desc    Fetch all medicines
// @route   GET /api/medicines
// @access  Private/Admin
const getMedicines = asyncHandler(async (req, res) => {

    
    const qSearch = req.query.search
    //testing
    //console.log(qSearch)
    let medicines

    if(qSearch){
        medicines = await Medicine.find(
            {
                $text: { $search: qSearch }
            }
        )
    }
    else{
         medicines = await Medicine.find();
    }

    
    res.status(200).json(medicines);

})
  
// @desc    Fetch logged in user medicines
// @route   GET /api/medicines/:id
// @access  Private
const getOneMedicine = asyncHandler(async (req, res) => {
    const medicine = await Medicine.findById(req.params.id)
  
    if (medicine) {
        res.status(200).json(medicine)
    } else {
        res.status(404)
        throw new Error('Medicine not found')
    }
})
  
// @desc    Create medicine
// @route   POST /api/medicines
// @access  Private
const createMedicine = asyncHandler(async (req, res) => {
    
    const { medicineName, uses } = req.body;

    const medicine = new Medicine({
        medicineName: medicineName,
        uses: uses,
    })

    const savedMedicine = await medicine.save();

    res.status(200).json(savedMedicine); 
})
  
// @desc    Update medicine
// @route   PUT /api/medicines/:id
// @access  Private
const updateMedicine = asyncHandler(async (req, res) => {

    const medicine = await Medicine.findById(req.params.id)
  
    if (medicine) {
  
        const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedMedicine)

    } else {
        res.status(404)
        throw new Error('Medicine not found')
    }
  })

// @desc    Delete medicine
// @route   DELETE /api/medicine/:id
// @access  Private
const deleteMedicine = asyncHandler(async (req, res) => {
    const medicine = await Medicine.findById(req.params.id)
  
    if (medicine) {
        await medicine.deleteOne();
        res.status(200).json({message: 'medicine removed'})
    } else {
        res.status(404)
        throw new Error('medicine not found')
    }
})

module.exports = {getMedicines, getOneMedicine, createMedicine, updateMedicine, deleteMedicine}