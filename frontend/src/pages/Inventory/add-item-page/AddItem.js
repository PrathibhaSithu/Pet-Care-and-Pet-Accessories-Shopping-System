import React, {useState } from "react";
import swal from "sweetalert2";
import AdminLayout from "../../Layouts/AdminLayout";
import uploadImage from '../../../uploadImage'
import {userRequest} from '../../../requestMethods'
import "./addItem.scss";

const AddItem = () => {
	
	// declaring state variables to do validation process
	const [skuError , setSkuError] = useState("")
	const [priceError , setPriceError] = useState("")
	const [qtyError , setQtyError] = useState("")
	const [reorderLvlError , setReorderLvlError] = useState("")
	const [picError , setPicError] = useState("")
	const [categError , setCategError] = useState("")
	const [rackErr , setRackErr] = useState("")
	const [manufacErr , setManufacErr] = useState("")
	const [mesUnitErr , setMesUnitErr] = useState("")
	const [itemErr , setItemErr] = useState("")

	let hasError = false

	const [file , setFile] = useState('')
	const [formData, setFormData] = useState({
		sku: "",
		itemName: "",
		category: "",
		price: "",
		rackNo: "",
		quantity: "",
		manufacturer: "",
		reorderLevel:"",
		measurementUnit:"",
		productImage: "",
	});

	const addItemFormHandler = async(event) => {
		event.preventDefault();
		console.log(formData);

		// check if item name empty
		if(formData.itemName === ""){
			setItemErr("Item Name can't be empty")
			hasError=true
		}
		else{
			setItemErr("")
		}

		// check if category
		if(formData.category === ""){
			setCategError("Categroy must be selected")
			hasError=true
		}
		else{
			setCategError("")
		}

		// check price
		if(parseFloat(formData.price) < 1 || formData.price === ""){
			setPriceError("Price can't be negative or empty")
			hasError=true
		}
		else{
			setPriceError("")
		}

		// check rack no
		if(formData.rackNo === ""){
			setRackErr("Rack number can't be empty")
			hasError=true
		}
		else{
			setRackErr("")
		}

		// check manufaturer
		if(formData.manufacturer === ""){
			setManufacErr("Manufacturer can't be empty")
			hasError=true
		}
		else{
			setManufacErr("")
		}

		// check reorder level
		if( parseInt(formData.reorderLevel) < 1|| formData.reorderLevel === ""){
			setReorderLvlError("Reorder level can't be negative or empty")
			hasError=true
		}
		else{
			setReorderLvlError("")
		}

		// check measurement unit
		if(formData.measurementUnit === ""){
			setMesUnitErr("Measurement unit field can't be empty")
			hasError=true
		}
		else{
			setMesUnitErr("")
		}


		// checking sku pattern
		const skuPattern = /^(CLI|PET)\d{4}$/;
  		if (!skuPattern.test(formData.sku)) {
    		setSkuError("SKU should start with CLI or PET followed by 4 digits");
    		hasError=true
  		}
		else{
			setSkuError("")
		}

		// checking quantity is valid
		if(parseInt(formData.quantity) < 1 || formData.quantity === '' ){
			setQtyError("Quantity can not be less than one or empty")
			hasError=true
		}
		else{
			setQtyError("")
		}

		// checking quantity is valid
		if(parseInt(formData.quantity) < 1 || formData.quantity === '' ){
			setQtyError("Quantity can not be less than one or empty")
			hasError=true
		}
		else{
			setQtyError("")
		}

		// // if picture not uploaded
		// if(formData.productImage === '' ){
		// 	setPicError("Valid picture type must be uploaded")
		// 	hasError=true
		// }
		// else{
		// 	setPicError("")
		// }

		if (!hasError) {

			const imageURL = await uploadImage(file);
			setFormData({...formData, productImage: imageURL})

				const dataToSend = {
					...formData , productImage: imageURL
				}

				await userRequest.post("inventory/", dataToSend)
				.then((response) => {
					console.log(response);
					swal.fire({
						icon: "success",
						iconColor: "#7D5FFF",
						title: "Operation Success",
						text: "Item added to the inventory!",
					});
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
					swal.fire({
						icon: "error",
						iconColor: "#e74c3c",
						title: "Operation Not Success",
						text: error,
					});
				});
			
			console.log(formData);
			setFormData({
				sku: "",
				itemName: "",
				category: "",
				price: "",
				rackNo: "",
				quantity: "",
				manufacturer: "",
				reorderLevel:"",
				measurementUnit:"",
				productImage: "",
			});
		} else {
			swal.fire({
				icon: "error",
				iconColor: "#e74c3c",
				title: "Validation Failed",
				text: "fill the relevant fields with suitable data",
			});
		}
	};

	const addItemInputHandler = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};


	// reset function
	const resetFunction = () => {
		setFormData(
			{
				sku: "",
				itemName: "",
				category: "",
				price: "",
				rackNo: "",
				quantity: "",
				manufacturer: "",
				reorderLevel:"",
				measurementUnit:"",
				// productImage: "",	
			}		
		)
	}

	return (
		<AdminLayout>
			<div className="add-item-container-main">
				{/* this is the form container */}
				<form
					className="add-item-form-container"
					onSubmit={addItemFormHandler}
				>
					<span className="tagline-add-item">
						Fill the form for add item
					</span>
					{/* input field container */}
					<div className="column-container">
						{/* column one */}
						<div className="add-item-column">
							<section className="input-container">
								<span className="input-title">item name</span>
								<input
									className="input-field-add-item"
									value={formData.itemName}
									name="itemName"
									onChange={addItemInputHandler}
								/>
								<span className={itemErr ? `validateErrors` : `validateErrors visible-non`}>{itemErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									store keeping unit (SKU)
								</span>
								<input
									className="input-field-add-item"
									value={formData.sku}
									name="sku"
									onChange={addItemInputHandler}
								/>
								<span className={skuError ? `validateErrors` : `validateErrors visible-non`}>{skuError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">category</span>
								<select
									className="input-field-add-item"
									name="category"
									value={formData.category}
									onChange={addItemInputHandler}
								>
									<option
										className="select-option"
										value=""
									>Select Category ---</option>
									<option
										className="select-option"
										value="clinical-item"
									>
										Clinical Item
									</option>
									<option
										className="select-option"
										value="store-item"
									>
										Pet Store Item
									</option>
								</select>
								<span className={categError ? `validateErrors` : `validateErrors visible-non`}>{categError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">unit price</span>
								<input
									className="input-field-add-item"
									value={formData.price}
									name="price"
									onChange={addItemInputHandler}
								/>
								<span className={priceError ? `validateErrors` : `validateErrors visible-non`}>{priceError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">rack number</span>
								<input
									className="input-field-add-item"
									value={formData.rackNo}
									name="rackNo"
									onChange={addItemInputHandler}
								/>
								<span className={rackErr ? `validateErrors` : `validateErrors visible-non`}>{rackErr}</span>
							</section>
						</div>
						{/* column two */}
						<div className="add-item-column">
							<section className="input-container">
								<span className="input-title">quantity</span>
								<input
									className="input-field-add-item"
									value={formData.quantity}
									name="quantity"
									onChange={addItemInputHandler}
								/>
								<span className={qtyError ? `validateErrors` : `validateErrors visible-non`}>{qtyError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									manufacturer
								</span>
								<input
									className="input-field-add-item"
									value={formData.manufacturer}
									name="manufacturer"
									onChange={addItemInputHandler}
								/>
								<span className={manufacErr ? `validateErrors` : `validateErrors visible-non`}>{manufacErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									reorder level
								</span>
								<input
									className="input-field-add-item"
									value={formData.reorderLevel}
									name="reorderLevel"
									onChange={addItemInputHandler}
								/>
								<span className={reorderLvlError ? `validateErrors` : `validateErrors visible-non`}>{reorderLvlError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									measurement unit
								</span>
								<input
									className="input-field-add-item"
									value={formData.measurementUnit}
									name="measurementUnit"
									onChange={addItemInputHandler}
								/>
								<span className={mesUnitErr ? `validateErrors` : `validateErrors visible-non`}>{mesUnitErr}</span>
							</section>
							
							<section className="input-container">
								<span className="input-title">
									product image
								</span>
								<input
									type="file"
									name="productImage"
									id="file-input"
									accept='.png, .jpeg, .jpg, .webp'
									className="input-field-add-item"
									onChange={(e) =>{
										 setFile(e.target.files[0])
									}}
								/>
								<span className={picError ? `validateErrors` : `validateErrors visible-non`}>{picError}</span>
							</section>
							<div className="btn-container-add-item">
								<button type="submit" className="submit-btn-add-item">
									Submit
								</button>
								<button type="reset" className="reset-btn-add-item" onClick={()=>resetFunction()}>
									Reset
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
};

export default AddItem;
