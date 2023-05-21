const express = require('express');
const router = express.Router();


const {getPets, getPetByID, createPet, updatePet, deletePet} = require('../controllers/petRegisterController')

router.get('/', getPets)
router.get('/:id',getPetByID)
router.post('/',createPet )
router.put('/:id', updatePet)
router.delete('/:id', deletePet)


module.exports = router;