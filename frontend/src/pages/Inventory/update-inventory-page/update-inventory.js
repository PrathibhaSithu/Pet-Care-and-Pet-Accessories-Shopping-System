import React , {useEffect, useState} from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import {userRequest} from '../../../requestMethods'
import './update-inventory.scss'
import Swal from 'sweetalert2';

import { useLocation, useNavigate } from 'react-router-dom';

function UpdateItem() {

	const navigate = useNavigate()

    const location = useLocation()
    const {id} = location.state

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

	let validationFailed = false

    
    useEffect(()=>{

		const fetchData = async() => {
			await userRequest.get(`inventory/mongo/${id}`).then((response)=>{
				setUpdateFormData(response.data)
				console.log(response.data);
			})
		}

		fetchData()
    },[])

	const [file , setFile] = useState('')
    const [updateFormData, setUpdateFormData] = useState({
        _id:"",
		sku: "",
		itemName: "",
		category: "",
		price: "",
		rackNo: "",
		quantity: "",
		manufacturer: "",
		productDescription: "",
		productImage: "",
	});


    const updateFormHandler = async(event) => {

		event.preventDefault()

		// check if item name empty
		if(updateFormData.itemName === ""){
			setItemErr("Item Name can't be empty")
			validationFailed = true
		}
		else{
			setItemErr("")
		}

		// check if category
		if(updateFormData.category === ""){
			setCategError("Categroy must be selected")
			validationFailed = true
		}
		else{
			setCategError("")
		}

		// check price
		if(parseFloat(updateFormData.price) < 1 || updateFormData.price === ""){
			setPriceError("Price can't be negative or empty")
			validationFailed = true
		}
		else{
			setPriceError("")
		}

		// check rack no
		if(updateFormData.rackNo === ""){
			setRackErr("Rack number can't be empty")
			validationFailed = true
		}
		else{
			setRackErr("")
		}

		// check manufaturer
		if(updateFormData.manufacturer === ""){
			setManufacErr("Manufacturer can't be empty")
			validationFailed = true
		}
		else{
			setManufacErr("")
		}

		// check reorder level
		if( parseInt(updateFormData.reorderLevel) < 1|| updateFormData.reorderLevel === ""){
			setReorderLvlError("Reorder level can't be negative or empty")
			validationFailed = true
		}
		else{
			setReorderLvlError("")
		}

		// check measurement unit
		if(updateFormData.measurementUnit === ""){
			setMesUnitErr("Measurement unit field can't be empty")
			validationFailed = true
		}
		else{
			setMesUnitErr("")
		}


		// checking sku pattern
		const skuPattern = /^(CLI|PET)\d{4}$/;
  		if (!skuPattern.test(updateFormData.sku)) {
    		setSkuError("SKU should start with CLI or PET followed by 4 digits");
    		validationFailed = true
  		}
		else{
			setSkuError("")
		}

		// checking quantity is valid
		if(parseInt(updateFormData.quantity) < 1 || updateFormData.quantity === '' ){
			setQtyError("Quantity can not be less than one or empty")
			validationFailed = true
		}
		else{
			setQtyError("")
		}

		// checking quantity is valid
		if(parseInt(updateFormData.quantity) < 1 || updateFormData.quantity === '' ){
			setQtyError("Quantity can not be less than one or empty")
			validationFailed = true
		}
		else{
			setQtyError("")
		}

       if(!validationFailed){
			await userRequest.put(`inventory/${id}` , updateFormData).then((response)=>{
				if(response){
					Swal.fire(
						{
							icon: "success",
							iconColor: "#7d5fff",
							title: "Inventory Updated",
							text: "Changes are made to the item!",
						}
					)
				}
			})
			.catch((error)=>{
                Swal.fire(
                    {
                        icon: "error",
				        iconColor: "#e74c3c",
				        title: "Operation Unsuccessful",
				        text: "Please check again!",
                    }
                )
                console.log(error);
        	})

			navigate("/admin/inventory/manage-inventory")
	   }
	   else{
				Swal.fire(
                    {
                        icon: "error",
				        iconColor: "#e74c3c",
				        title: "Form Validation Failed",
				        text: "Fill the fields with relevant data!",
                    }
                )
	   }
    }

	const updateItemInputHandler = (event) => {
		setUpdateFormData({ ...updateFormData, [event.target.name]: event.target.value });
	};

	const backBtn = () => {
		navigate("/admin/inventory/manage-inventory")
	}

  return (
        <AdminLayout>
			<div className="add-item-container-main">
				{/* this is the form container */}
				<form
					className="add-item-form-container"
					onSubmit={updateFormHandler}
				>
					<span className="tagline-add-item">
						Update an item
					</span>
					{/* input field container */}
					<div className="column-container">
						{/* column one */}
						<div className="add-item-column">
							<section className="input-container">
								<span className="input-title">item name</span>
								<input
									className="input-field-add-item"
									value={updateFormData.itemName}
									name="itemName"
									onChange={updateItemInputHandler}
								/>
								<span className={itemErr ? `validateErrors` : `validateErrors visible-non`}>{itemErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									store keeping unit (SKU)
								</span>
								<input
									className="input-field-add-item"
									value={updateFormData.sku}
									name="sku"
									onChange={updateItemInputHandler}
								/>
								<span className={skuError ? `validateErrors` : `validateErrors visible-non`}>{skuError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">category</span>
								<select
									className="input-field-add-item"
									name="category"
									value={updateFormData.category}
									onChange={updateItemInputHandler}
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
									value={updateFormData.price}
									name="price"
									onChange={updateItemInputHandler}
								/>
								<span className={priceError ? `validateErrors` : `validateErrors visible-non`}>{priceError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">rack number</span>
								<input
									className="input-field-add-item"
									value={updateFormData.rackNo}
									name="rackNo"
									onChange={updateItemInputHandler}
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
									value={updateFormData.quantity}
									name="quantity"
									onChange={updateItemInputHandler}
								/>
								<span className={qtyError ? `validateErrors` : `validateErrors visible-non`}>{qtyError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									manufacturer
								</span>
								<input
									className="input-field-add-item"
									value={updateFormData.manufacturer}
									name="manufacturer"
									onChange={updateItemInputHandler}
								/>
								<span className={manufacErr ? `validateErrors` : `validateErrors visible-non`}>{manufacErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									reorder level
								</span>
								<input
									className="input-field-add-item"
									value={updateFormData.reorderLevel}
									name="reorderLevel"
									onChange={updateItemInputHandler}
								/>
								<span className={reorderLvlError ? `validateErrors` : `validateErrors visible-non`}>{reorderLvlError}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									measurement unit
								</span>
								<input
									className="input-field-add-item"
									value={updateFormData.measurementUnit}
									name="measurementUnit"
									onChange={updateItemInputHandler}
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
									Update
								</button>
								<button type="reset" className="reset-btn-add-item" onClick={()=>backBtn()}>
									Back
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
  )
}

export default UpdateItem