const express = require("express");
const {
	getSingleSupplier,
    getSingleSupplierMongo,
    getAllSuppliers,
    updateSingleSupplier,
    deleteSingleSupplier,
    registerSupplier
} = require("../controllers/supplierController");

const router = express.Router();

// get all the suppliers from the database
router.get("/", getAllSuppliers);

// get a single supplier from the database
router.get("/:id", getSingleSupplier);

// register a suppleir
router.post("/", registerSupplier);

//update a single item
router.put("/:id", updateSingleSupplier);

// delete a single item
router.delete("/:id", deleteSingleSupplier);

// get single item from mongID
router.get("/mongo/:id",getSingleSupplierMongo)

// exporting the express router

module.exports = router;
