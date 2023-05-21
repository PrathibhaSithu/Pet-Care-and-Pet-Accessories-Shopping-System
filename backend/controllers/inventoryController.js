const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");
// const pdfMake = require("pdfmake");
// const fs = require("fs");

// const itemModel = require("../models/itemModel")

// get a single item
const getSingleItem = asyncHandler(async (req, res) => {
	const storeKeepingUnit = req.params.id;

	const getSingleItem = await Item.find({ sku: storeKeepingUnit });

	if (getSingleItem.length === 0) {
		res.status(400).json({ message: "no item found" });
	} else {
		res.status(200).json(getSingleItem);
	}
});


// get a single item by mongo id
const getSingleItemMongo = asyncHandler(async (req, res) => {
	const mongo = req.params.id;

	const getSingleItem = await Item.findById(mongo);

	if (getSingleItem.length === 0) {
		res.status(400).json({ message: "no item found" });
	} else {
		res.status(200).json(getSingleItem);
	}
});



// get all items
const getAllItems = asyncHandler(async (req, res) => {
	const getAllItems = await Item.find({}).sort({ createdAt: -1 });

	if (getAllItems) {
		res.json(getAllItems);
	} else {
		res.json({ message: "no items in the inventory" });
	}

	// res.status(200).json({message: "route is working bro"})
});

// create single item
const createSingleItem = asyncHandler(async (req, res) => {
	const sample = ({
		sku,
		itemName,
		category,
		price,
		rackNo,
		quantity,
		manufacturer,
		reorderLevel,
		measurementUnit,
		productImage,
	} = req.body);

	const createItem = await Item.create(sample);

	res.json(createItem);
});

// update a single item
const updateSingleItem = asyncHandler(async (req, res) => {
	const mongoID = req.params.id;

	const requestedItem = await Item.findByIdAndUpdate(mongoID,req.body,{new:true});

	if (!requestedItem) {
		res.status(404);
		throw new Error("Item not existing");
	} else {
		res.status(202).json(updatedItem);
	}
});

// delete a single item
const deleteSingleItem = asyncHandler(async (req, res) => {
	const id = req.params.id;

	await Item.findByIdAndDelete(id);
	res.status(200);
	res.json({ message: "item was deleted from the database" });
});

module.exports = {
	getSingleItem,
	getAllItems,
	createSingleItem,
	updateSingleItem,
	deleteSingleItem,
	// printInventoryReport,
	getSingleItemMongo
};
