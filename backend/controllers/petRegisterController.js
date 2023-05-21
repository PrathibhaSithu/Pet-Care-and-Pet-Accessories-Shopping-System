const asyncHandler = require('express-async-handler');

const Pet = require('../models/petRegisterModels')


// @desc    Fetch all pets
// @route   GET /api/pets
// @access  Private/Admin
const getPets = asyncHandler(async (req, res) => {

    const qSearch = req.query.search
     
     let pets

     if(qSearch){
         pets = await Pet.find(
            {
                $text:{$search: qSearch}
            }
         )
     }else{
         pets = await Pet.find();
     }

    res.status(200).json(pets);

})
  
// @desc    Fetch a pet
// @route   GET /api/pets/:id
// @access  Private/Admin
const getPetByID = asyncHandler(async (req, res) => {
    const pet = await Pet.findById((req.params.id))
  
    if (pet) {
        res.status(200).json(pet)
    } else {
        res.status(404)
        throw new Error('Pet not found')
    }
})
  
// @desc    Create pet
// @route   POST /api/pets
// @access  Private/Admin
const createPet = asyncHandler(async (req, res) => {
    
    const { petID, petName,age, gender,species, breed, nic, customerName,contactNumber,medicalHistory, picture } = req.body;

    const pet = new Pet({
        petID: petID,
        petName: petName,
        age:age,
        gender:gender,
        species:species,
        breed: breed,
        nic:nic,
        customerName: customerName,
        contactNumber:contactNumber,
        medicalHistory:medicalHistory,
        picture: picture
    })

    const savedPet = await pet.save();

    res.status(200).json(savedPet); 
})
  
// @desc    Update pet
// @route   PUT /api/pets/:id
// @access  Private/Admin
const updatePet = asyncHandler(async (req, res) => {

    const pet = await Pet.findById(req.params.id)
  
    if (pet) {
  
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedPet)

    } else {
        res.status(404)
        throw new Error('Pet not found')
    }
  })

// @desc    Delete pet
// @route   DELETE /api/pets/:id
// @access  Private/Admin
const deletePet = asyncHandler(async (req, res) => {
    const pet = await Pet.findById(req.params.id)
  
    if (pet) {
        await pet.deleteOne();
        res.status(200).json({message: 'Pet removed'})
    } else {
        res.status(404)
        throw new Error('Pet not found')
    }
})

module.exports = {getPets, getPetByID, createPet, updatePet, deletePet}
