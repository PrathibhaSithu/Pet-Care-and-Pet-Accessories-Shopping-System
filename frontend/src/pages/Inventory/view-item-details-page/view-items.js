import AdminLayout from "../../Layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import "./view-items.scss";
import { useLocation  , useNavigate} from "react-router-dom";
import {userRequest} from '../../../requestMethods'

function ViewInventoryItem() {
	const location = useLocation();
	const { id } = location.state;

	const [loading, setIsLoading] = useState(false)
	const [viewItem, setViewItem] = useState({});

	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			await userRequest.get(`inventory/mongo/${id}`)
			.then((response) => {
					setViewItem(response.data);
					setIsLoading(true)
				}
			)
			.catch((err)=>{
				console.log(err);
			})
		};

		fetchData();
	},[]);

	console.log(viewItem);
	return (
		<AdminLayout>
			<div className="view-inventory-item-container">
				<div className="container">
					<img src={viewItem.productImage} alt="" className="pic-box-inventory-item"/>
					<button className="view-item-back-btn" onClick={()=>{navigate("/admin/inventory/manage-inventory")}}>Back</button>
				</div>
				<div className="container">
					<div className="field-names">
						<span className="data-fields-inventory">Item Name</span>
						<span className="data-fields-inventory">
							Manufacturer
						</span>
						<span className="data-fields-inventory">SKU ID</span>
						<span className="data-fields-inventory">Remaining Quantity</span>
						<span className="data-fields-inventory">
							Unit Price
						</span>
						<span className="data-fields-inventory">Category</span>
						<span className="data-fields-inventory">Rack No</span>
						<span className="data-fields-inventory">Reorder Level</span>
						<span className="data-fields-inventory">Measurement Unit</span>
						<span className="data-fields-inventory">
							Created At
						</span>
						<span className="data-fields-inventory">
							Updated At
						</span>
					</div>
					<div className="field-values">
						<span className="data-fields-inventory-values">
							{viewItem.itemName}
						</span>
						<span className="data-fields-inventory-values">
							{viewItem.manufacturer}
						</span>
						<span className="data-fields-inventory-values">
							{viewItem.sku}
						</span>
						<span className="data-fields-inventory-values">
							{viewItem.quantity}
						</span>
						<span className="data-fields-inventory-values">
							Rs. {viewItem.price}
						</span>
						<span className="data-fields-inventory-values">
							{viewItem.category}
						</span>
						<span className="data-fields-inventory-values">
							{viewItem.rackNo}
						</span>
						<span className="data-fields-inventory-values">
							{viewItem.reorderLevel}
						</span>
						<span className="data-fields-inventory-values">
							{viewItem.measurementUnit}
						</span>
						<span className="data-fields-inventory-values">
							{loading ? viewItem.createdAt.toString().substring(0,10) : viewItem.createdAt}
						</span>
						<span className="data-fields-inventory-values">
							{loading ? viewItem.updatedAt.toString().substring(0,10) : viewItem.updatedAt}
						</span>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export default ViewInventoryItem;
