const express = require('express');
const router = express.Router();

const {getPrescriptions, getOnePrescription, createPrescription, updatePrescription, deletPrescription} = require('../controllers/prescriptionController')


router.get('/', getPrescriptions)
router.get('/:id', getOnePrescription)

router.post('/', createPrescription)
router.put('/:id', updatePrescription)
router.delete('/:id', deletPrescription)

module.exports = router;