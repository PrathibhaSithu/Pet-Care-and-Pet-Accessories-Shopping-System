const asyncHandler = require("express-async-handler");
const Supplier = require("../models/supplierModel");

// get a single item
const getSingleSupplier = asyncHandler(async (req, res) => {
	const ID = req.params.id;

	const singleSupplier = await Supplier.find({ agentID: ID });

	if (!singleSupplier) {
		res.status(400).json({ message: "no supplier found" });
	} else {
		res.status(200).json(singleSupplier);
	}
});


// get a single item by mongo id
const getSingleSupplierMongo = asyncHandler(async (req, res) => {
	const mongo = req.params.id;

	const getSingleSupplier = await Supplier.findById(mongo);

	if (!getSingleSupplier) {
		res.status(400).json({ message: "no supplier found" });
	} else {
		res.status(200).json(getSingleSupplier);
	}
});



// get all items
const getAllSuppliers = asyncHandler(async (req, res) => {
	const getAllSuppliers = await Supplier.find({}).sort({ createdAt: -1 });

	if (getAllSuppliers) {
		res.json(getAllSuppliers);
	} else {
		res.json({ message: "no items in the inventory" });
	}
});

// create single item
const registerSupplier = asyncHandler(async (req, res) => {

	const sample = ({
		companyName,
		businessType,
		agentName,
		agentID,
		supplierCategory,
		supplyingItem,
		email,
		phone,
		companyAddress,

	} = req.body);

	const regSupplier = await Supplier.create(sample);

	res.json(regSupplier);
});

// update a single item
const updateSingleSupplier = asyncHandler(async (req, res) => {
	const mongoID = req.params.id;
	const requestedSupplier = await Supplier.findByIdAndUpdate(mongoID,req.body,{new:true});

	if (!requestedSupplier) {
		res.status(404);
		throw new Error("Item not existing");
	} else {
		res.status(202).json(requestedSupplier);
	}
});

// delete a single item
const deleteSingleSupplier = asyncHandler(async (req, res) => {
	const id = req.params.id;
	await Supplier.findByIdAndDelete(id);
	res.status(200);
	res.json({ message: "item was deleted from the database" });
});



module.exports = {
	deleteSingleSupplier,
    updateSingleSupplier,
    registerSupplier,
    getAllSuppliers,
    getSingleSupplier,
    getSingleSupplierMongo
};
