const express = require('express');
const router = express.Router();


const {getTreatments, getTreatmentByID, createTreatment, updateTreatment, deleteTreatment} = require('../controllers/petTreatmentsController')

router.get('/', getTreatments)
router.get('/:id',getTreatmentByID)
router.post('/',createTreatment )
router.put('/:id', updateTreatment)
router.delete('/:id', deleteTreatment)


module.exports = router;