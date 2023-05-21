const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware');

const {getCarts, getMyCart, createCart, updateCart, deleteCart} = require('../controllers/cartController')


router.post('/', protect, createCart)
router.get('/find/:userId', protect, getMyCart)
router.delete('/:id', protect, deleteCart)
router.put('/:id', protect, updateCart)

router.get('/', protect, admin, getCarts)


module.exports = router;