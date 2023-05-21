import React , {useState , useEffect} from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { useLocation , useNavigate } from 'react-router-dom'
import { userRequest } from '../../../requestMethods'
import './release-items.scss'
import Swal from 'sweetalert2'

function ReleaseItems() {
  const navigate = useNavigate()
  const location = useLocation()
  const {id} = location.state

	// declaring state variables to do validation process
	const [relRecordErr , setRelRecordErr] = useState("")
	const [skuErr , setSkuError] = useState("")
  const [itemErr , setItemErr] = useState("")
  const [categError , setCategError] = useState("")
  const [priceErr, setPriceErr] = useState("")
	const [qtyError , setQtyError] = useState("")
	const [totalCostError , setTotalCostError] = useState("")
	const [staffNameErr , setStaffNameErr] = useState("")
	const [staffIDErr , setStaffIDErr] = useState("")
	const [mesUnitErr , setMesUnitErr] = useState("")
	

	let validationFailed = false
  
   const [itemObject , setItemObject] = useState({
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
   })

   const [releaseItemFormData, setReleaseFormData] = useState({
        releaseRecord:"",
        sku: "",
        itemName: "",
        category: "",
        price: "",
        quantity: "",
        totalCost: "",
        staffName: "",
        staffID:"",
        measurementUnit: "",
	});


  const releaseFormInputHandler = (e) => {
      const {name , value} = e.target 

      if(name === 'quantity'){
          const qty = parseInt(value)
          const totalCost = qty * parseFloat(releaseItemFormData.price)

          setReleaseFormData((prev)=>({
            ...prev,
            [name]:value,
            totalCost: isNaN(totalCost) ? "" : totalCost.toFixed(2)
          }))
      }
      else{
          setReleaseFormData((prev)=>({
            ...prev,
            [name]:value,
          }))
      }
  };

  const releaseItemFormHandler = async(event) => {

		event.preventDefault()

		// check if rel record
		if(releaseItemFormData.releaseRecord === ""){
			setRelRecordErr("Record ID can't be empty!")
			validationFailed = true
		}
		else{
			setRelRecordErr("")
		}

		// check if category
		if(releaseItemFormData.category === ""){
			setCategError("Categroy must be selected")
			validationFailed = true
		}
		else{
			setCategError("")
		}

		// check price
		if(parseFloat(releaseItemFormData.price) < 1 || releaseItemFormData.price === ""){
			setPriceErr("Price can't be negative or empty")
			validationFailed = true
		}
		else{
			setPriceErr("")
		}

		// check measurement unit
		if(releaseItemFormData.measurementUnit === ""){
			setMesUnitErr("Measurement unit field can't be empty")
			validationFailed = true
		}
		else{
			setMesUnitErr("")
		}

		// checking sku pattern
		const skuPattern = /^(CLI|PET)\d{4}$/;
  		if (!skuPattern.test(releaseItemFormData.sku)) {
    		setSkuError("SKU should start with CLI or PET followed by 4 digits");
    		validationFailed = true
  		}
		else{
			  setSkuError("")
		}

    // check item name
		if(releaseItemFormData.itemName === ""){
			setItemErr("Item name can't be empty")
			validationFailed = true
		}
		else{
			setItemErr("")
		}

    // check staff name
		if(releaseItemFormData.staffName === ""){
			setStaffNameErr("Staff member name can't be empty")
			validationFailed = true
		}
		else{
			setStaffNameErr("")
		}

    // check staff id
		const staffIDTemplate = /^SID\d{4}$/
		if(!staffIDTemplate.test(releaseItemFormData.staffID)){
			setStaffIDErr("Staff ID format should be SIDXXXX")
			validationFailed = true
		}
		else{
			setStaffIDErr("")
		}

    // check totalCost
		if(parseFloat(releaseItemFormData.totalCost) < 0){
			setTotalCostError("Total cost must not be empty or negative value")
			validationFailed = true
		}
		else{
			setTotalCostError("")
		}


		// checking quantity is valid
		if(parseInt(releaseItemFormData.quantity) <= 0 || parseInt(releaseItemFormData.quantity) > parseInt(itemObject.quantity)){
			setQtyError("Quantity can't be equal or less than zero")
			validationFailed = true
		}
		else{
			setQtyError("")
		}

       if(!validationFailed){

        let quantity = parseInt(itemObject.quantity) - parseInt(releaseItemFormData.quantity)
        setItemObject({...itemObject, quantity});
        const passingObject = {...itemObject, quantity};
        console.log(quantity);
        console.log(passingObject);

        
        const newObj = {...releaseItemFormData , totalCost: parseFloat(releaseItemFormData.totalCost) , quantity: parseInt(releaseItemFormData.quantity)}
        console.log(newObj);
        await userRequest.post("release-items/",newObj)
        .then((res)=>{
          console.log("success");
        })
        .catch((err)=>{
          console.log(err);
        })

			  await userRequest.put(`inventory/${id}` , passingObject).then((response)=>{
				if(response){
					Swal.fire(
						{
							icon: "success",
							iconColor: "#7d5fff",
							title: "Inventory Updated",
							text: "Items released form the stock!",
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
				                text: "Something went wrong! Try Again!",
                    }
                )
                console.log(error);
        	})
			navigate("/admin/inventory/release-search")
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

    const backBtn = () => {
      navigate("/admin/inventory/release-search")
    }

  useEffect(() => {
  const fetchData = async () => {
    await userRequest.get(`inventory/mongo/${id}`).then((response) => {
      setItemObject(response.data);
      setReleaseFormData((prev) => ({
        ...prev,
        sku: response.data.sku,
        itemName: response.data.itemName,
        category: response.data.category,
        price: response.data.price,
        measurementUnit: response.data.measurementUnit,
        quantity: 0
      }));
      console.log(response.data);
    });
  };
  fetchData();
}, []);



  return (
    <AdminLayout>
			<div className="release-item-container-main">
				{/* this is the form container */}
				<form
					className="release-item-form-container"
					onSubmit={releaseItemFormHandler}
				>
					<span className="tagline-release-item">
						Release an item form the stock <span>  [Note: {itemObject.quantity} items currently remaining in the stock from this item]</span>
					</span>
					{/* input field container */}
					<div className="column-container">
						{/* column one */}
						<div className="release-item-column">
							<section className="input-container">
								<span className="input-title">Record ID</span>
								<input
									className="input-field-release-item"
									value={releaseItemFormData.releaseRecord}
									name="releaseRecord"
									onChange={releaseFormInputHandler}
								/>
								<span className={relRecordErr ? `validateErrors` : `validateErrors visible-non`}>{relRecordErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">
									store keeping unit (SKU)
								</span>
								<input
									className="input-field-release-item"
									value={releaseItemFormData.sku}
									name="sku"
									onChange={releaseFormInputHandler}
                  disabled
								/>
								<span className={skuErr ? `validateErrors` : `validateErrors visible-non`}>{skuErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">category</span>
								<select
									className="input-field-release-item"
									name="category"
									value={releaseItemFormData.category}
									onChange={releaseFormInputHandler}
                  disabled
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
									className="input-field-release-item"
									value={releaseItemFormData.price}
									name="price"
									onChange={releaseFormInputHandler}
                  disabled
								/>
								<span className={priceErr ? `validateErrors` : `validateErrors visible-non`}>{priceErr}</span>
							</section>
							<section className="input-container">
								<span className="input-title">Total Cost</span>
								<input
									className="input-field-release-item"
									value={releaseItemFormData.totalCost}
									name="totalCost"
									onChange={()=>{
                    setReleaseFormData(releaseFormInputHandler)
                  }}
                  disabled
								/>
								<span className={totalCostError ? `validateErrors` : `validateErrors visible-non`}>{totalCostError}</span>
							</section>
						</div>
						{/* column two */}
						<div className="release-item-column">

              <section className="input-container">
								<span className="input-title">item name</span>
								<input
									className="input-field-release-item"
									value={releaseItemFormData.itemName}
									name="itemName"
									onChange={releaseFormInputHandler}
                  disabled
								/>
								<span className={itemErr ? `validateErrors` : `validateErrors visible-non`}>{itemErr}</span>
							</section>

              
              <section className="input-container">
								<span className="input-title">measurement unit</span>
								<input
									className="input-field-release-item"
									value={releaseItemFormData.measurementUnit}
									name="measurementUnit"
									onChange={releaseFormInputHandler}
                  disabled
								/>
								<span className={itemErr ? `validateErrors` : `validateErrors visible-non`}>{itemErr}</span>
							</section>


							<section className="input-container">
								<span className="input-title">quantity</span>
								<input
									className="input-field-release-item"
									value={releaseItemFormData.quantity}
									name="quantity"
									onChange={releaseFormInputHandler}
								/>
								<span className={qtyError ? `validateErrors` : `validateErrors visible-non`}>{qtyError}</span>
							</section>

              <section className="input-container">
								<span className="input-title">Employee Name</span>
								<input
									className="input-field-release-item"
									value={releaseItemFormData.staffName}
									name="staffName"
									onChange={releaseFormInputHandler}
								/>
								<span className={staffNameErr ? `validateErrors` : `validateErrors visible-non`}>{staffNameErr}</span>
							</section>

              <section className="input-container">
								<span className="input-title">Employee ID</span>
								<input
									className="input-field-release-item"
									value={releaseItemFormData.staffID}
									name="staffID"
									onChange={releaseFormInputHandler}
								/>
								<span className={staffIDErr ? `validateErrors` : `validateErrors visible-non`}>{staffIDErr}</span>
							</section>
							
							<div className="btn-container-release-item">
								<button type="submit" className="submit-btn-release-item">
									Release
								</button>
								<button type="reset" className="reset-btn-release-item" onClick={()=>backBtn()}>
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

export default ReleaseItems