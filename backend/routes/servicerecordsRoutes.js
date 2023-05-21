const express = require('express');
const router = express.Router();

const {getServiceRecords, getServiceRecordById, addServiceRecord, updateServiceRecord, deleteServiceRecord} = require('../controllers/servicerecordsController')


router.get('/', getServiceRecords)
router.get('/:id', getServiceRecordById)

router.post('/',addServiceRecord)
router.delete('/:id',deleteServiceRecord)
router.put('/:id',updateServiceRecord)

module.exports = router;
