import React , {useEffect, useState} from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import swal from 'sweetalert2';
import { userRequest } from '../../../requestMethods';
import './UpdateOrder.scss'
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';


function UpdateOrder() {

	// declaring state variables to do validation process
	const[shippingAmountError, setShippingAmountError] = useState("")
	const[totalError, setTotalError] = useState("")
	const[deliveryStatusError, setDeliveryStatusError] = useState("")
	const[assignedDriverError, setAssignedDriverError] = useState("")

	let hasError = false

    const navigate = useNavigate()
    const location = useLocation()
    const {id} = location.state
    console.log(id);


	const [orderDetails, setOrderDetails] = useState({
		_id: "",
		orderId: "",
		shipping:{
			name: "", 
			address:{
				line1:"", 
				line2:"", 
				city:"" },
			phone:""},
		deliveryStatus:"",
		shippingAmount:"",
		total:"",
		assignedDriver:""		
	});


    useEffect(()=>{
       const fetcher = async() => {
			await userRequest.get(`deliver-orders/mongo/${id}`)
			.then((response)=>{
				console.log(response.data)
				setOrderDetails(response.data)
				console.log(orderDetails);
			})
			.catch((err) => {
				console.log(err)
			})
		}

		fetcher()
		
    },[setOrderDetails])

	
	const updateOrderFormHandler = (event) => {
		event.preventDefault();

		// check if the shippingAmount is empty
		if(orderDetails.shippingAmount === ""){
			setShippingAmountError("Shipping Amount can't be empty")
			hasError = true
		}
		else{
			setShippingAmountError("")
		}

		// check if the total is empty
		if (orderDetails.total === "") {
			setTotalError("Total Amount can't be empty");
			hasError = true;
  		} else {
			setTotalError("");
  		}

		// check if the delivery status is empty
		if (orderDetails.deliveryStatus === "") {
			setDeliveryStatusError("Please Select the Delivery Status");
			hasError = true;
  		} else {
			setDeliveryStatusError("");
  		}

		// check if the assigned driver is empty
		if (orderDetails.assignedDriver === "") {
			setAssignedDriverError("Please Enter the assigned vehicle no");
			hasError = true;
  		} else {
			setAssignedDriverError("");
  		}

		if(!hasError){
			console.log(orderDetails._id);
			userRequest.put(`deliver-orders/${orderDetails._id}`, orderDetails).then((response) => {
				console.log(response.data);
				console.log("success");
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
				text: "Please fill relevant fields",
			});
		}
  

		// if (orderDetails.orderId !== "") {
		// 	console.log(orderDetails._id);
		// 	userRequest.put(`deliver-orders/${orderDetails._id}`, orderDetails).then((response) => {
		// 		console.log(response.data);
		// 		console.log("success");
		// 	});
		// 	swal.fire({
		// 		icon: "success",
		// 		title: "Operation Successful",
		// 		text: "Driver added to the database",
		// 	});

        //     navigateBackBtn()
		// } else {
		// 	console.log(orderDetails);
		// 	userRequest.put("/deliver-orders", orderDetails).then((response) => {
		// 		console.log(response.data);
		// 		console.log("success");
		// 	});
		// 	swal.fire({
		// 		icon: "error",
		// 		title: "Operation Unsuccessful",
		// 		text: "Please fill relevant fields",
		// 	});
		// }
	};

	const navigateBackBtn = () => {
        navigate(`/admin/delivery/view-order`);
    }

	const updateOrderFormInputHandler = (event) => {
		setOrderDetails({
			...orderDetails,
			[event.target.name]: event.target.value,
		});
	};

    return (
		<AdminLayout>
			<div className="update-order-container">
				<form
					className="form-container-update-order"
					onSubmit={updateOrderFormHandler}
				>
					{/* column lane one */}
					<div className="column-update-order">
						<section className="input-container-update-order">
							<span className="input-title-update-order">Order ID</span>
							<input
								className="input-field-update-order"
								value={orderDetails.orderId}
								onChange={updateOrderFormInputHandler}
								name="orderId"
								disabled
							/>
							<span className="validateErrors visible-non"></span>
						</section>
						<section className="input-container-update-order">
							<span className="input-title-update-order">Customer Name</span>
							<input
								className="input-field-update-order"
								value={orderDetails.shipping.name}
								onChange={updateOrderFormInputHandler}
								name="shipping.name"
								disabled
							/>
							<span className="validateErrors visible-non"></span>
						</section>
						<section className="input-container-update-order">
							<span className="input-title-update-order">Address Line 1</span>
							<input
								className="input-field-update-order"
								value={orderDetails.shipping.address.line1}
								onChange={updateOrderFormInputHandler}
								name="shipping.address.line1"
								disabled
							/>
							<span className="validateErrors visible-non"></span>
						</section>
						<section className="input-container-update-order">
							<span className="input-title-update-order">Address Line 2</span>
							<input
								className="input-field-update-order"
								value={orderDetails.shipping.address.line2}
								onChange={updateOrderFormInputHandler}
								name="shipping.address.line2"
								disabled
							/>
							<span className="validateErrors visible-non"></span>
						</section>
						<section className="input-container-update-order">
							<span className="input-title-update-order">City</span>
							<input
								className="input-field-update-order"
								value={orderDetails.shipping.address.city}
								onChange={updateOrderFormInputHandler}
								name="shipping.address.city"
								disabled
							/>
							<span className="validateErrors visible-non"></span>
						</section>
					</div>
					{/* column lane two */}
					<div className="column-update-order">
						<section className="input-container-update-order">
							<span className="input-title-update-order">
								Telephone Number
							</span>
							<input
								className="input-field-update-order"
								value={orderDetails.shipping.phone}
								onChange={updateOrderFormInputHandler}
								name="shipping.phone"
								disabled
							/>
							<span className="validateErrors visible-non"></span>
						</section>
						<section className="input-container-update-order">
							<span className="input-title-update-order">
								Shipping Amount(Rs.)
							</span>
							<input
								className="input-field-update-order"
								value={orderDetails.shippingAmount}
								onChange={updateOrderFormInputHandler}
								name="shippingAmount"
							/>
							<span className={shippingAmountError ? `validateErrors` : `validateErrors visible-non`}>{shippingAmountError}</span>
						</section>
						<section className="input-container-update-order">
							<span className="input-title-update-order">
								Total Amount(Rs.)
							</span>
							<input
								className="input-field-update-order"
								value={orderDetails.total}
								onChange={updateOrderFormInputHandler}
								name="total"
							/>
							<span className={totalError ? `validateErrors` : `validateErrors visible-non`}>{totalError}</span>
						</section>
						<section className="input-container-update-order">
							<span className="input-title-update-order">Delivery Status</span>
							<select
								className="input-field-update-order"
								// value={orderDetails.deliveryStatus}
								onChange={updateOrderFormInputHandler}
								name="deliveryStatus"
								value={orderDetails.deliveryStatus}
							>
								<option className="select-option-update-order" value="">
									Select Type
								</option>
								<option className="select-option-update-order" value="Processing">
									Processing
								</option>
								<option className="select-option-update-order" value="Completed">
									Completed
								</option>
							</select>
							<span className={deliveryStatusError ? `validateErrors` : `validateErrors visible-non`}>{deliveryStatusError}</span>
						</section>
                        <section className="input-container-update-order">
							<span className="input-title-update-order">
								Enter Assigned Vehicle No
							</span>
							<input
								className="input-field-update-order"
								value={orderDetails.assignedDriver}
								onChange={updateOrderFormInputHandler}
								name="assignedDriver"
							/>
							<span className={assignedDriverError ? `validateErrors` : `validateErrors visible-non`}>{assignedDriverError}</span>
						</section>
						<div className="btn-container-update-order">
							<button
								onClick={() => {
									navigateBackBtn()
								}}
								className="reset-btn-update-order"
							>
								Back
							</button>
							<button type="submit" className="submit-btn-update-order">
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
	);  
}

export default UpdateOrder