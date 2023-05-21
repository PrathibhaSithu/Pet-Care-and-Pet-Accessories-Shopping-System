import AdminLayout from "../../Layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import "./view-supplier.scss";
import { useLocation  , useNavigate} from "react-router-dom";
import { userRequest } from "../../../requestMethods";
import ViewSupplier from '../../../assets/view-supplier.png'

function ViewSupplierDetails() {
	const location = useLocation();
	const { id } = location.state;

	const [viewSupplierDetails, setViewSupplierDetails] = useState({});
	const [loading, setIsloading] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			await userRequest.get(`suppliers/mongo/${id}`).then(
				(response) => {
					setViewSupplierDetails(response.data);
					setIsloading(true)
				},
				[setViewSupplierDetails]
			);
		};

		fetchData();
		
	});

	console.log(viewSupplierDetails);
  
	return (
		<AdminLayout>
			<div className="view-inventory-item-container">
				<div className="container">
					<img src={ViewSupplier} alt="" className="pic-box-view-supplier"></img>
					<button className="view-supplier-back-btn" onClick={()=>{navigate("/admin/inventory/manage-suppliers")}}>Back</button>
				</div>
				<div className="container">
					<div className="field-names-supplier">
						<span className="data-fields-supplier">Company Name</span>
						<span className="data-fields-supplier">
							Agent Name
						</span>
						<span className="data-fields-supplier">Agent ID</span>
						<span className="data-fields-supplier">Supplier Category</span>
						<span className="data-fields-supplier">
							Supplying Item
						</span>
						<span className="data-fields-supplier">Company Address</span>
						<span className="data-fields-supplier">Business Type</span>
						<span className="data-fields-supplier">
							Email
						</span>
						<span className="data-fields-supplier">
							Phone
						</span>
						<span className="data-fields-supplier">
							Created At
						</span>
            <span className="data-fields-supplier">
							Updated At
						</span>
					</div>
					<div className="field-values">
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.companyName}
						</span>
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.agentName}
						</span>
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.agentID}
						</span>
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.supplierCategory}
						</span>
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.supplyingItem}
						</span>
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.companyAddress}
						</span>
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.businessType}
						</span>
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.email}
						</span>
						<span className="data-fields-supplier-values">
							{viewSupplierDetails.phone}
						</span>
						<span className="data-fields-supplier-values">
							{loading ? viewSupplierDetails.createdAt.toString().substring(0,10) : viewSupplierDetails.createdAt}
						</span>
            			<span className="data-fields-supplier-values">
							{loading ? viewSupplierDetails.updatedAt.toString().substring(0,10) : viewSupplierDetails.updatedAt}
						</span>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export default ViewSupplierDetails;
