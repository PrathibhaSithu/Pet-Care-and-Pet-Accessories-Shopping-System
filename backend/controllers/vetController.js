const asyncHandler = require('express-async-handler');

const Vet = require('../models/vetModel')


// @desc    Fetch all vets
// @route   GET /api/vets
// @access  Private/Admin
const getVets = asyncHandler(async (req, res) => {

    const vSearch = req.query.search
    //testing
    //console.log(vSearch)
    let vets

    if(vSearch){
        vets = await Vet.find(
            {
                $text: { $search: vSearch }
            }
        )
    }
    else{
         vets = await Vet.find();
    }
    
    res.status(200).json(vets);

})
  
// @desc    Fetch logged in user vet
// @route   GET /api/vets/:id
// @access  Private
const getOneVet = asyncHandler(async (req, res) => {
    const vet = await Vet.findById(req.params.id)
  
    if (vet) {
        res.status(200).json(vet)
    } else {
        res.status(404)
        throw new Error('Vet not found')
    }
})
  
// @desc    Create vet
// @route   POST /api/vets
// @access  Private
const createVet = asyncHandler(async (req, res) => {
    
    const { vcslId, vetName, telephone, email, experience, qualification, profilePicture } = req.body;

    const vet = new Vet({
        vcslId: vcslId,
        vetName: vetName,
        telephone: telephone,
        email: email,
        experience: experience,
        qualification: qualification,
        profilePicture: profilePicture,
    })

    const savedVet = await vet.save();

    res.status(200).json(savedVet); 
})
  
// @desc    Update vet
// @route   PUT /api/vets/:id
// @access  Private
const updateVet = asyncHandler(async (req, res) => {

    const vet = await Vet.findById(req.params.id)
  
    if (vet) {
  
        const updatedVet = await Vet.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedVet)

    } else {
        res.status(404)
        throw new Error('Vet not found')
    }
  })

// @desc    Delete vet
// @route   DELETE /api/vetstv/:id
// @access  Private
const deleteVet = asyncHandler(async (req, res) => {
    const vet = await Vet.findById(req.params.id)
  
    if (vet) {
        await vet.deleteOne();
        res.status(200).json({message: 'Vet removed'})
    } else {
        res.status(404)
        throw new Error('Vet not found')
    }
})

module.exports = {getVets, getOneVet, createVet, updateVet, deleteVet}