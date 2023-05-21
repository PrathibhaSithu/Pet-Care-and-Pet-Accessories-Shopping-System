const express = require('express');
const router = express.Router();


const {getLeave, getLeaveById, addLeave, updateLeave, deleteLeave} = require('../controllers/leaveController')


router.get('/', getLeave)
router.get('/:id', getLeaveById)

router.post('/',  addLeave)
router.delete('/:id', deleteLeave)
router.put('/:id', updateLeave)

module.exports = router;