const asyncHandler = require("express-async-handler");
const ReleaseItem = require("../models/releaseItemModel");


// get a single released record
const getSingleReleaseRecord = asyncHandler(async (req, res) => {
	const relRecord = req.params.id;

	const getSingleRecord = await ReleaseItem.find({ releaseRecord: relRecord });

	if (getSingleRecord.length === 0) {
		res.status(400).json({ message: "no records found" });
	} else {
		res.status(200).json(getSingleRecord);
	}
});


// get a single record by mongo id
const getSingleReleaseRecordUsingMongo = asyncHandler(async (req, res) => {
	const recordMongo = req.params.id;

	const getSingleReleaseRecord = await ReleaseItem.findById(recordMongo);

	if (getSingleReleaseRecord.length === 0) {
		res.status(400).json({ message: "no release records found" });
	} else {
		res.status(200).json(getSingleReleaseRecord);
	}
});



// get all release records
const getAllReleaseRecords = asyncHandler(async (req, res) => {
	const getAllRelRecords = await ReleaseItem.find({}).sort({ createdAt: -1 });

	if (getAllRelRecords) {
		res.json(getAllRelRecords);
	} else {
		res.json({ message: "no release records in the database" });
	}
});

// create single release record
const createSingleReleaseRecord = asyncHandler(async (req, res) => {
	const sampleRecord = ({
        releaseRecord,
		sku,
		itemName,
		category,
		price,
		quantity,
		totalCost,
        staffName,
        staffID,
        measurementUnit,
	} = req.body);

	const createRecord = await ReleaseItem.create(sampleRecord);

	res.json(createRecord);
});

// update a single record
const updateSingleReleaseRecord = asyncHandler(async (req, res) => {
	const mongoID = req.params.id;

	const updatedRecord = await ReleaseItem.findByIdAndUpdate(mongoID,req.body,{new:true});

	if (!updatedRecord) {
		res.status(404);
		throw new Error("record not existing");
	} else {
		res.status(202).json(updatedRecord);
	}
});

// delete a single record
const deleteSingleReleaseRecord = asyncHandler(async (req, res) => {
	const recordID = req.params.id;

	await ReleaseItem.findByIdAndDelete(recordID);
	res.status(200);
	res.json({ message: "record was deleted from the database" });
});

module.exports = {
	getSingleReleaseRecord,
    getSingleReleaseRecordUsingMongo,
    getAllReleaseRecords,
    createSingleReleaseRecord,
    updateSingleReleaseRecord,
    deleteSingleReleaseRecord
};
