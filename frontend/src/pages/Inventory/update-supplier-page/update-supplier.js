import React , {useEffect, useState} from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { userRequest } from '../../../requestMethods';
import './update-supplier.scss'
import Swal from 'sweetalert2';

import { useLocation, useNavigate } from 'react-router-dom';

function UpdateSupplierDetails() {

	const navigate = useNavigate()

    const location = useLocation()
    const {id} = location.state


	// declare state variables to handle validations
	const [compNameErr,setCompNameErr] = useState("")
	const [agentNameErr, setAgentNameErr] = useState("")
	const [agentIDErr,setAgentIDErr] = useState("")
	const [btypeErr,setBtypeErr] = useState("")
	const [emailErr,setEmailErr] = useState("")
	const [phoneErr,setPhoneErr] = useState("")
	const [supCategErr,setSupCategErr] = useState("")
	const [compAddressErr,setCompAddressErr] = useState("")
	const [supItemErr,setSupItemErr] = useState("")

    
    useEffect(()=>{

		const fetchSupplierData = async() => {
			await userRequest.get(`suppliers/mongo/${id}`).then((response)=>{
				setUpdateSupplierFormData(response.data)
				console.log(response.data);
			})
		}

		fetchSupplierData()
    },[])

    const [updateSupplierFormData, setUpdateSupplierFormData] = useState({
			_id: "",
			companyName: "",
			businessType: "",
			agentName: "",
			agentID: "",
			supplierCategory: "",
			supplyingItem: "",
			email: "",
			phone: "",
			companyAddress: "",
	});


    const updateSupplierFormHandler = async(event) => {

		event.preventDefault()

		let hasErrors =  false

		// check if company name is empty
		if(updateSupplierFormData.companyName === ""){
			setCompNameErr("Company name can't be empty!")
			hasErrors = true
		}
		else{
			setCompNameErr("")
		}

		// check if agent name is empty
		if(updateSupplierFormData.agentName === ""){
			setAgentNameErr("Agent name can't be empty!")
			hasErrors = true
		}
		else{
			setAgentNameErr("")
		}

		// check if agent ID is valid
		const validAgentID = /^SUP\d{4}$/
		if(!validAgentID.test(updateSupplierFormData.agentID)){
			setAgentIDErr("Agent id must start with SUP and have 4 digits")
			hasErrors = true
		}
		else{
			setAgentIDErr("")
		}

		// check if business type is empty
		if(updateSupplierFormData.businessType === ""){
			setBtypeErr("Business type can't be empty!")
			hasErrors = true
		}
		else{
			setBtypeErr("")
		}

		// check if supplier category is empty
		if(updateSupplierFormData.supplierCategory === ""){
			setSupCategErr("Supplier category can't be empty!")
			hasErrors = true
		}
		else{
			setSupCategErr("")
		}

		// check if supplier item is empty
		if(updateSupplierFormData.supplyingItem === ""){
			setSupItemErr("Supplying item can't be empty!")
			hasErrors = true
		}
		else{
			setSupItemErr("")
		}

		// check if email valid
		const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		if(!emailValidator.test(updateSupplierFormData.email)){
			setEmailErr("Entered email is not valid!")
			hasErrors = true
		}
		else{
			setEmailErr("")
		}

		// check if phone number valid
		const phoneValidator = /^\d{10}$/
		if(!phoneValidator.test(updateSupplierFormData.phone)){
			setPhoneErr("Entered phone number is not valid!")
			hasErrors = true
		}
		else{
			setPhoneErr("")
		}

		// check if company address is empty
		if(updateSupplierFormData.companyAddress === ""){
			setCompAddressErr("Company address can't be empty")
			hasErrors = true
		}
		else{
			setCompAddressErr("")
		}




		if(!hasErrors){
				await userRequest.put(`suppliers/${id}` , updateSupplierFormData).then((response)=>{
					if(response){
						Swal.fire(
							{
								icon: "success",
								iconColor: "#7d5fff",
								title: "Supplier Details Updated",
								text: "Changes are made to the supplier!",
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
		
				navigate("/admin/inventory/manage-suppliers")
			}
		}


	const updateSupplierInputHandler = (event) => {
		setUpdateSupplierFormData({ ...updateSupplierFormData, [event.target.name]: event.target.value });
	};

	const backBtn = () => {
		navigate("/admin/inventory/manage-suppliers")
	}

  return (
       <AdminLayout>
			<div className="add-supplier-container-main">
				{/* this is the form container */}
				<form
					className="add-supplier-form-container"
					onSubmit={updateSupplierFormHandler}
				>
					<span className="tagline-add-supplier">
						Update details of the supplier
					</span>
					{/* input field container */}
					<div className="column-container">
						{/* column one */}
						<div className="add-supplier-column">
							<section className="input-container">
								<span className="input-title">
									Company Name
								</span>
								<input
									className="input-field-add-supplier"
									value={updateSupplierFormData.companyName}
									name="companyName"
									onChange={updateSupplierInputHandler}
								/>
								<span className={compNameErr ? `validateErrors` : `validateErrors visible-non`}>{compNameErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">Agent Name</span>
								<input
									className="input-field-add-supplier"
									value={updateSupplierFormData.agentName}
									name="agentName"
									onChange={updateSupplierInputHandler}
								/>
								<span className={agentNameErr ? `validateErrors` : `validateErrors visible-non`}>{agentNameErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">Agent ID</span>
								<input
									className="input-field-add-supplier"
									value={updateSupplierFormData.agentID}
									name="agentID"
									onChange={updateSupplierInputHandler}
								/>
								<span className={agentIDErr ? `validateErrors` : `validateErrors visible-non`}>{agentIDErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									Business Type
								</span>
								<select
									className="input-field-add-supplier"
									name="businessType"
									value={updateSupplierFormData.businessType}
									onChange={updateSupplierInputHandler}
								>
									<option
										className="select-option"
										value=""
									>select business type--</option>
									<option
										className="select-option"
										value="manufacturer"
									>
										Manufacturer
									</option>
									<option
										className="select-option"
										value="distributor"
									>
										Distributor
									</option>
									<option
										className="select-option"
										value="whole-sale-dealer"
									>
										Wholesale Dealer
									</option>
								</select>
								<span className={btypeErr ? `validateErrors` : `validateErrors visible-non`}>{btypeErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">supplier category</span>
								<select
									className="input-field-add-supplier"
									value={updateSupplierFormData.supplierCategory}
									name="supplierCategory"
									onChange={updateSupplierInputHandler}
								>
									<option
										className="select-option"
										value=""
									>
										select supplier category--
									</option>
									<option
										className="select-option"
										value="clinical-item"
									>
										Clinical-Item
									</option>
									<option
										className="select-option"
										value="pet-item"
									>
										Pet-Item
									</option>
								</select>
								<span className={supCategErr ? `validateErrors` : `validateErrors visible-non`}>{supCategErr}</span>
							</section>
						</div>
						{/* column two */}
						<div className="add-supplier-column">
							<section className="input-container">
								<span className="input-title">
									Supplying Item
								</span>
								<input
									className="input-field-add-supplier"
									value={updateSupplierFormData.supplyingItem}
									name="supplyingItem"
									onChange={updateSupplierInputHandler}
								/>
								<span className={supItemErr ? `validateErrors` : `validateErrors visible-non`}>{supItemErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">Email</span>
								<input
									type="email"
									className="input-field-add-supplier"
									value={updateSupplierFormData.email}
									name="email"
									onChange={updateSupplierInputHandler}
								/>
								<span className={emailErr ? `validateErrors` : `validateErrors visible-non`}>{emailErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">Phone</span>
								<input
									type="text"
									name="phone"
									value={updateSupplierFormData.phone}
									className="input-field-add-supplier"
									onChange={updateSupplierInputHandler}
								/>
								<span className={phoneErr ? `validateErrors` : `validateErrors visible-non`}>{phoneErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									Company Address
								</span>
								<input
									type="text"
									name="companyAddress"
									value={updateSupplierFormData.companyAddress}
									className="input-field-add-supplier"
									onChange={updateSupplierInputHandler}
								/>
								<span className={compAddressErr ? `validateErrors` : `validateErrors visible-non`}>{compAddressErr}</span>
							</section>
							<div className="btn-container-add-supplier">
								<button type="submit" className="submit-btn-add-supplier">
									Update
								</button>
								<button className="reset-btn-add-supplier" onClick={()=>{backBtn()}}>
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

export default UpdateSupplierDetails