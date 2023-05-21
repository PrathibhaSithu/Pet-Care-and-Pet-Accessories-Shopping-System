const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware');

const {getProducts, getProductById, addProduct, updateProduct, deleteProduct, getProductCountByCategory, getProductStats} = require('../controllers/productController')


router.get('/', getProducts)
router.get('/:id', getProductById)

router.post('/', protect, admin, addProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.put('/:id', protect, admin, updateProduct)
router.get('/insights/productCount', protect, admin, getProductCountByCategory)
router.get('/insights/productStats', protect, admin, getProductStats)

module.exports = router;