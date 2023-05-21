import React , {useEffect, useState} from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import swal from 'sweetalert2';
import { userRequest } from '../../../requestMethods';
import './update-driver.scss'
import Swal from 'sweetalert2';

import { useLocation, useNavigate } from 'react-router-dom';

function UpdateDriver() {

	// declaring state variables to do validation process
	const[driverNameError, setDriverNameError] = useState("")
	const[nicNumberError, setNicNumberError] = useState("")
	const[driversLicenceNoError, setDriversLicenceNoError] = useState("")
	const[vehicleRegNoError, setVehicleRegNoError] = useState("")
	const[permAddressError, setPermAddressError] = useState("")
	const[phoneNumError, setPhoneNumError] = useState("")
	const[vehicleTypeError, setVehicleTypeError] = useState("")
	// const[driverStatusError, setDriverStatusError] = useState("")

	let hasError = false

    const navigate = useNavigate()

    const location = useLocation()
    const {id} = location.state
    console.log(id);


    useEffect(()=>{
        userRequest.get(`/drivers/mongo/${id}`).then((response)=>{
            setDriverDetails(response.data)
            console.log(driverDetails);
        })
    },[])

    const [driverDetails, setDriverDetails] = useState({
		driverName: "",
		nicNumber: "",
		driversLicenceNo: "",
		vehicleRegNo: "",
		permAddress: "",
		phoneNum: "",
		vehicleType: "",
		driverStatus: "",
	});

	const addDriverFormHandler = (event) => {
		event.preventDefault();

	// check if the name is empty
	if(driverDetails.driverName === ""){
		setDriverNameError("Driver Name can't be empty")
		hasError = true
	}
	else{
		setDriverNameError("")
	}

	// check if the NIC number format is correct
	// nicPattern to match either 9 digits + 'v' [\d{9}v] or 12 digits [\d{12}]
	const nicPattern = /^(\d{9}v|\d{12})$/i; 
	if (!nicPattern.test(driverDetails.nicNumber)) {
		 setNicNumberError("Invalid NIC, Accepted format: XXXXXXXXXv | 12 digit NIC");
		  hasError = true;
	} else {
		  setNicNumberError("");
	}

	// check if the driver's license number format is correct
	const driversLicenceNoPattern = /^B\d{7}$/i; // regex to match 'B' followed by 7 digits
	if (!driversLicenceNoPattern.test(driverDetails.driversLicenceNo)) {
		setDriversLicenceNoError("Invalid Driver's License Number, Accepted format: Bxxxxxxx");
		  hasError = true;
	} else {
		  setDriversLicenceNoError("");
	}

	// check if the vehicle registration number format is correct
	const vehicleRegNoPattern = /^([A-Z]{2}\d{4}|[A-Z]{3}\d{4})$/; // regex to match the specified format
	if (!vehicleRegNoPattern.test(driverDetails.vehicleRegNo)) {
		  setVehicleRegNoError("Invalid Number, Accepted format: ABCxxxx | ABxxxx");
		  hasError = true;
	} else {
		  setVehicleRegNoError("");
	}

	// check if the permanent address is empty
	if (driverDetails.permAddress === "") {
		setPermAddressError("Please enter your address");
		hasError = true;
	} else {
		setPermAddressError("");
	}

	// check if the phone number has 10 digits
	const phoneNumPattern = /^\d{10}$/; // regex to match exactly 10 digits
	if (!phoneNumPattern.test(driverDetails.phoneNum)) {
		  setPhoneNumError("Invalid Phone Number");
		  hasError = true;
	} else {
		 setPhoneNumError("");
	}

	// check if the vehicle type is empty
	if (driverDetails.vehicleType === "") {
		setVehicleTypeError("Vehicle Type is required");
		hasError = true;
	  } else {
		setVehicleTypeError("");
	  }
		
	if(!hasError){
		console.log(driverDetails);
			userRequest.put(`/drivers/mongo/${id}`, driverDetails).then((response) => {
				console.log(response.data);
				console.log("successful");
			});
			swal.fire({
				icon: "success",
				title: "Operation Successful",
				text: "Driver added to the database",
			});

            navigateBackBtn()
	} else{
		swal.fire({
			icon: "error",
			title: "Operation Unsuccessful",
			text: "Please re-check the relevant fields",
		});
	}

		// if (driverDetails.driverName !== "") {
		// 	console.log(driverDetails);
		// 	userRequest.put(`/drivers/mongo/${id}`, driverDetails).then((response) => {
		// 		console.log(response.data);
		// 		console.log("success bro");
		// 	});
		// 	swal.fire({
		// 		icon: "success",
		// 		title: "Operation Successful",
		// 		text: "Driver added to the database",
		// 	});

        //     navigateBackBtn()
		// } else {
		// 	console.log(driverDetails);
		// 	userRequest.post("/drivers", driverDetails).then((response) => {
		// 		console.log(response.data);
		// 		console.log("success bro");
		// 	});
		// 	swal.fire({
		// 		icon: "error",
		// 		title: "Operation Unsuccessful",
		// 		text: "Please fill relevant fields",
		// 	});
		// }
	};

	const navigateBackBtn = () => {
        navigate(`/admin/delivery/manage-driver`);
    }

	const addDriverFormInputHandler = (event) => {
		setDriverDetails({
			...driverDetails,
			[event.target.name]: event.target.value,
		});
	};

    return (
		<AdminLayout>
			<div className="update-driver-container">
				<form
					className="form-container-update-driver"
					onSubmit={addDriverFormHandler}
				>
					{/* column lane one */}
					<div className="column-update-driver">
						<section className="input-container-update-driver">
							<span className="input-title-update-driver">driver name</span>
							<input
								className="input-field-update-driver"
								value={driverDetails.driverName}
								onChange={addDriverFormInputHandler}
								name="driverName"
							/>
							<span className={driverNameError ? `validateErrors` : `validateErrors visible-non`}>{driverNameError}</span>
						</section>
						<section className="input-container-update-driver">
							<span className="input-title-update-driver">NIC number</span>
							<input
								className="input-field-update-driver"
								value={driverDetails.nicNumber}
								onChange={addDriverFormInputHandler}
								name="nicNumber"
							/>
							<span className={nicNumberError ? `validateErrors` : `validateErrors visible-non`}>{nicNumberError}</span>
						</section>
						<section className="input-container-update-driver">
							<span className="input-title-update-driver">
								permanent address
							</span>
							<textarea
								className="input-textarea-update-driver"
								id=""
								cols="30"
								rows="10"
								value={driverDetails.permAddress}
								onChange={addDriverFormInputHandler}
								name="permAddress"
							></textarea>
							<span className={permAddressError ? `validateErrors` : `validateErrors visible-non`}>{permAddressError}</span>
						</section>
						<section className="input-container-update-driver">
							<span className="input-title-update-driver">
								telephone number
							</span>
							<input
								className="input-field-update-driver"
								value={driverDetails.phoneNum}
								onChange={addDriverFormInputHandler}
								name="phoneNum"
							/>
							<span className={phoneNumError ? `validateErrors` : `validateErrors visible-non`}>{phoneNumError}</span>
						</section>
					</div>
					{/* column lane two */}
					<div className="column-update-driver">
						<section className="input-container-update-driver">
							<span className="input-title-update-driver">
								driver's liscene number
							</span>
							<input
								className="input-field-update-driver"
								value={driverDetails.driversLicenceNo}
								onChange={addDriverFormInputHandler}
								name="driversLicenceNo"
							/>
							<span className={driversLicenceNoError ? `validateErrors` : `validateErrors visible-non`}>{driversLicenceNoError}</span>
						</section>
						<section className="input-container-update-driver">
							<span className="input-title-update-driver">
								vehicle registration number
							</span>
							<input
								className="input-field-update-driver"
								value={driverDetails.vehicleRegNo}
								onChange={addDriverFormInputHandler}
								name="vehicleRegNo"
							/>
							<span className={vehicleRegNoError ? `validateErrors` : `validateErrors visible-non`}>{vehicleRegNoError}</span>
						</section>
						<section className="input-container-update-driver">
							<span className="input-title-update-driver">vehicle type</span>
							<select
								className="input-field-update-driver"
								value={driverDetails.vehicleType}
								onChange={addDriverFormInputHandler}
								name="vehicleType"
							>
								{" "}
								<option className="select-option-update-driver" value="">
									Select Type
								</option>
								<option className="select-option-update-driver" value="Bike">
									Motorcycle
								</option>
								<option className="select-option-update-driver" value="Car">
									Car
								</option>
								<option className="select-option-update-driver" value="Lorry">
									Lorry
								</option>
								<option className="select-option-update-driver" value="Van">
									Van
								</option>
							</select>
							<span className={vehicleTypeError ? `validateErrors` : `validateErrors visible-non`}>{vehicleTypeError}</span>
						</section>
                        <section className="input-container-update-driver">
							<span className="input-title-update-driver">Select Status</span>
							<select
								className="input-field-update-driver"
								value={driverDetails.driverStatus}
								onChange={addDriverFormInputHandler}
								name="driverStatus"
							>
								{" "}
								<option className="select-option-update-driver" value="Available">
									Available
								</option>
								<option className="select-option-update-driver" value="Unavailable">
									Unavailable
								</option>
							</select>
						</section>
						<div className="btn-container-update-driver">
							<button
								onClick={() => {
									navigateBackBtn()
								}}
								className="reset-btn-update-driver"
							>
								Back
							</button>
							<button type="submit" className="submit-btn-update-driver">
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
	);  
}

export default UpdateDriver