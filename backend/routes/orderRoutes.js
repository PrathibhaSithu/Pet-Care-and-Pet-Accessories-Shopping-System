const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const {
	createOrder,
	getOrderById,
	updateOrder,
	getMyOrders,
	getOrders,
	deleteOrder,
	getMonthlyIncome,
	getYearlyIncome,
	getDailyOrderCount,
	getOrderStats,
	getProductIncome
} = require("../controllers/orderController");

// router.post("/", protect, createOrder);
router.get("/:id", protect, getOrderById);
router.get("/my/orders", protect, getMyOrders);

router.get('/', protect, admin, getOrders)
router.put('/:id', protect, admin, updateOrder)
router.delete('/:id', protect, admin, deleteOrder)
router.get('/insights/montlyIncome', protect, admin, getMonthlyIncome)
router.get('/insights/yearlyIncome', protect, admin, getYearlyIncome)
router.get('/insights/dailyOrderCount', protect, admin, getDailyOrderCount)
router.get('/insights/orderStats', protect, admin, getOrderStats)
router.get('/insights/productIncome/:id', protect, admin, getProductIncome)


module.exports = router;
