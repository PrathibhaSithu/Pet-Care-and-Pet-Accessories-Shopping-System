const mongoose = require("mongoose");

const driverSchema = mongoose.Schema(
	{
		driverName: {
			type: String,
			required: true,
		},

		nicNumber: {
			type: String,
			required: true,
		},

		driversLicenceNo: {
			type: String,
			required: true,
		},

		vehicleRegNo: {
			type: String,
			required: true,
		},

		permAddress: {
			type: String,
			required: true,
		},

		phoneNum: {
			type: String,
			required: true,
		},

		vehicleType: {
			type: String,
			required: true,
		},

		driverStatus: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("driver", driverSchema);
