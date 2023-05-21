const express = require('express');
const router = express.Router();


const {getStaff, getStaffById, addStaff, updateStaff, deleteStaff} = require('../controllers/staffController')


router.get('/', getStaff)
router.get('/:id', getStaffById)

router.post('/', addStaff)
router.delete('/:id', deleteStaff)
router.put('/:id', updateStaff)

module.exports = router;