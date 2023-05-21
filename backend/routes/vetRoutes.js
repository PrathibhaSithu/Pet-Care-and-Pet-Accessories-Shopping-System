const express = require('express');
const router = express.Router();

const {getVets, getOneVet, createVet, updateVet, deleteVet} = require('../controllers/vetController')


router.get('/', getVets)
router.get('/:id', getOneVet)

router.post('/', createVet)
router.put('/:id', updateVet)
router.delete('/:id', deleteVet)

module.exports = router;