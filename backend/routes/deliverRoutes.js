const express = require("express");
const router = express.Router();

const {retrieveOrders , retrieveSpecificOrder , updateOrder , retrieveSpecificOrderUsinMongo} = require('../controllers/deliverOrderController')


// route for get the all of the orders
router.get("/", retrieveOrders)

// route for get specific order
router.get("/:id", retrieveSpecificOrder)

// route for get specific order
router.get("/mongo/:id", retrieveSpecificOrderUsinMongo)


router.put("/:id", updateOrder)

module.exports = router