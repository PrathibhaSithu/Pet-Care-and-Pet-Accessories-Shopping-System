const asyncHandler = require("express-async-handler");
const Driver = require("../models/driverModel");

// method for get all the drivers
const getAllDrivers = asyncHandler(async (req, res) => {
	const requestedItems = await Driver.find({});

	if (requestedItems) {
		res.status(200).json(requestedItems);
	} else {
		res.status(400).json({
			message: "No drivers",
			status: "database is empty",
		});
	}
});

// method for get a single driver
const getSingleDriver = asyncHandler(async (req, res) => {
	const name = req.params.id;

	const selectedDriver = await Driver.find({ driverName: name });

	if (selectedDriver.length !== 0) {
		res.status(200).json(selectedDriver);
	} else {
		res.status(404).json({ message: "driver not found" });
	}
});

// method for create a new driver
const createNewDriver = asyncHandler(async (req, res) => {
	const {
		driverName,
		nicNumber,
		driversLicenceNo,
		vehicleRegNo,
		permAddress,
		phoneNum,
		vehicleType,
		driverStatus,
	} = req.body;

	if (
		driverName === "" ||
		nicNumber === "" ||
		driversLicenceNo === "" ||
		vehicleRegNo === "" ||
		permAddress === "" ||
		phoneNum === "" ||
		vehicleType === ""
	) {
		res.status(303).json({ message: "Please fill the relevant field" });
	} else {
		const driver = new Driver({
			driverName,
			nicNumber,
			driversLicenceNo,
			vehicleRegNo,
			permAddress,
			phoneNum,
			vehicleType,
			driverStatus,
		});

		const createdDriver = await driver.save();

		res.json(createdDriver);
	}
});

// update method
const updateDriverDetails = asyncHandler(async (req, res) => {
	const driverID = req.params.id;

	const selectedDriver = await Driver.find({ nicNumber: driverID });

	if (selectedDriver.length !== 0) {
		const updatedDriver = await Driver.findByIdAndUpdate(
			selectedDriver[0]._id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(201).json(updatedDriver);
	} else {
		res.status(404).json({ message: "Driver not found" });
	}
});


// update method
const UpdateDriverDetailsUsingMongo = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const selectedDriver = await Driver.findByIdAndUpdate(id ,{ $set: req.body },{ new: true });

	if (selectedDriver) {
		res.status(201).json(selectedDriver);
	} else {
		res.status(404).json({ message: "Driver not found" });
	}
});


// find by mongo id method
const FindDriverDetailsUsingMongo = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const selectedDriver = await Driver.findById(id);

	if (selectedDriver) {
		res.status(201).json(selectedDriver);
	} else {
		res.status(404).json({ message: "Driver not found" });
	}
});



// delete method
const deleteDriver = asyncHandler(async (req, res) => {
	const deletingID = req.params.id;

	const searchedDriver = await Driver.findOne({ nicNumber: deletingID });

	if (searchedDriver.length !== 0) {
		await Driver.deleteOne({ _id: searchedDriver._id });
		res.status(201).json({ message: "driver deleted" });
	} else {
		res.status(404).json({ message: "driver not found" });
	}
});

module.exports = {
	getAllDrivers,
	createNewDriver,
	getSingleDriver,
	deleteDriver,
	updateDriverDetails,
	UpdateDriverDetailsUsingMongo,FindDriverDetailsUsingMongo
};
