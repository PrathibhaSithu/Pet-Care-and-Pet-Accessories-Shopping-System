const express = require('express');
const router = express.Router();

const {getServices, getServiceById, addService, updateService, deleteService} = require('../controllers/serviceController')


router.get('/', getServices)
router.get('/:id', getServiceById)

router.post('/',addService)
router.delete('/:id',deleteService)
router.put('/:id',updateService)

module.exports = router;
