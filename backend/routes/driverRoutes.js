const express = require("express");
const router = express.Router();

const {
	createNewDriver,
	getAllDrivers,
	getSingleDriver,
	deleteDriver,
	updateDriverDetails,
	UpdateDriverDetailsUsingMongo,
	FindDriverDetailsUsingMongo
} = require("../controllers/driverController");

// route for the get all drivers
router.get("/", getAllDrivers);

// route for the get a single driver
router.get("/:id", getSingleDriver);

// router for the create a driver
router.post("/", createNewDriver);

// route for the update details of a driver
router.put("/:id", updateDriverDetails);

// route for the get details of a driver using mongo
router.get("/mongo/:id", FindDriverDetailsUsingMongo);

// route for the update details of a driver
router.put("/mongo/:id", UpdateDriverDetailsUsingMongo);

// route for the delete details of the driver
router.delete("/:id", deleteDriver);

module.exports = router;
