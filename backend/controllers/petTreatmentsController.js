const asyncHandler = require('express-async-handler');

const Treatments = require('../models/petTreatmentsModel')

// @desc    Fetch all treatment
// @route   GET /api/treatment
// @access  Private/Admin
const getTreatments = asyncHandler(async (req, res) => {
    const qSearch=req.query.search
     
     let treatments

     if(qSearch){
         treatments = await Treatments.find(
            {
                $text:{$search: qSearch}
            }
         )
     }else{
         treatments = await Treatments.find();
     }
    res.status(200).json(treatments);

})

// @desc    Fetch a treatment
// @route   GET /api/treatment/:id
// @access  Private/Admin
const getTreatmentByID = asyncHandler(async (req, res) => {
    const treatment = await Treatments.findById(req.params.id)
  
    if (treatment) {
        res.status(200).json(treatment)
    } else {
        res.status(404)
        throw new Error('treatment not found')
    }
})
  
// @desc    Create treatment
// @route   POST /api/treatment
// @access  Private/Admin
const createTreatment = asyncHandler(async (req, res) => {
    
    const { petID, petName, nic,date, treatment,progressNotes} = req.body;

    const petTreatment = new Treatments({
        petID: petID,
        petName: petName,
        nic: nic,
        date:date,
        treatment:treatment,
        progressNotes:progressNotes,
        
    })

    const savedTreatments = await petTreatment.save();

    res.status(200).json(savedTreatments); 
})
  
// @desc    Update treatment
// @route   PUT /api/treatment/:id
// @access  Private/Admin
const updateTreatment = asyncHandler(async (req, res) => {

    const treatment = await Treatments.findById(req.params.id)
  
    if (treatment) {
  
        const updatedTreatmnet = await Treatments.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedTreatmnet)

    } else {
        res.status(404)
        throw new Error('treatments not found')
    }
  })

// @desc    Delete treatment
// @route   DELETE /api/treatment/:id
// @access  Private/Admin
const deleteTreatment = asyncHandler(async (req, res) => {
    const treatment = await Treatments.findById(req.params.id)
  
    if (treatment) {
        await treatment.deleteOne();
        res.status(200).json({message: 'treatment removed'})
    } else {
        res.status(404)
        throw new Error('treatment not found')
    }
})

module.exports = {getTreatments, getTreatmentByID, createTreatment, updateTreatment, deleteTreatment}
