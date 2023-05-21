const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware');

const {getAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment} = require('../controllers/appointmentController')

router.post('/', createAppointment)

router.get('/', getAppointments)
router.get('/:id', getAppointmentById)
router.put('/:id', updateAppointment)
router.delete('/:id', deleteAppointment)

module.exports = router;