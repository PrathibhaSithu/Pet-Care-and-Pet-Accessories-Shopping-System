const express = require("express");
const {
	getSingleReleaseRecord,
    getSingleReleaseRecordUsingMongo,
    getAllReleaseRecords,
    createSingleReleaseRecord,
    updateSingleReleaseRecord,
    deleteSingleReleaseRecord
} = require("../controllers/releaseItemsController");

const router = express.Router();

// get all the items from inventory
router.get("/", getAllReleaseRecords);

// get a single item from inventory
router.get("/:id", getSingleReleaseRecord);

// create a single item
router.post("/", createSingleReleaseRecord);

//update a single item
router.put("/:id", updateSingleReleaseRecord);

// delete a single item
router.delete("/:id", deleteSingleReleaseRecord);

// get single item from mongID
router.get("/mongo/:id",getSingleReleaseRecordUsingMongo);

// exporting the express router

module.exports = router;
