const express = require('express');
const router = express.Router();


const {getPayroll, getPayrollById, addPayroll, updatePayroll, deletePayroll} = require('../controllers/payrollController')


router.get('/', getPayroll)
router.get('/:id', getPayrollById)

router.post('/',  addPayroll)
router.delete('/:id', deletePayroll)
router.put('/:id', updatePayroll)

module.exports = router;