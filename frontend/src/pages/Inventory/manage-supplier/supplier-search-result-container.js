import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { userRequest } from "../../../requestMethods";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

export default function SupplierSearchResultsContainer(props) {
	const { suppliers, setFunc } = props;
	const navigate = useNavigate();

	// view function
	const viewItem = (id) => {
		navigate("/admin/supplier/view-supplier-details", { state: { id } });
	};

	// update function
	const updateItem = (id) => {
		navigate(`/admin/supplier/update-supplier-details`, { state: { id } });
		console.log(id);
	};

	// delete function
	const deleteSupplier = (deletingID) => {
		console.log(deletingID);
		Swal.fire({
				title: 'Confirmation Needed',
				text: "Please confirm your action",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#f44336', // Red color for confirm button
				cancelButtonColor: '#4caf50', // Green color for cancel button      
				confirmButtonText: 'Delete',
				// reverseButtons: true,
			})
			.then(async(result) => {
				if (result.isConfirmed) {
					

					await userRequest.delete(`suppliers/${deletingID}`)
						.then((response) => {
							console.log(response);
							Swal.fire(
								"Deleted!",
								"Your file has been deleted.",
								"success"
							);
						})
						.catch((error) => {
							console.log(error);
						});

					const newSet = suppliers.filter((object) => {
						const { _id } = object;

						return _id !== deletingID;
					});

					console.log(newSet);
					setFunc(newSet);
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					Swal.fire(
						"Cancelled",
						"Your imaginary file is safe :)",
						"error"
					);
				}
			});
	};

	return (
		<div>
			{suppliers.reverse().map((singleItem) => {
				const { _id, companyName, agentName, agentID, supplierCategory, supplyingItem } =
					singleItem;

				// const supplierPassBucket = {
				// 	_id,
				// 	itemName,
				// 	sku,
				// 	category,
				// 	manufacturer,
				// 	quantity,
				// };

				if (suppliers.length > 0) {
					return (
						<div className="running-short-item" key={_id}>
							<span className="item-field-manage-inventory">
								{companyName}
							</span>
							<span className="item-field-manage-inventory">
								{agentName}
							</span>
							<span className="item-field-manage-inventory">
								{agentID}
							</span>
							<span className="item-field-manage-inventory">
								{supplierCategory}
							</span>
							<span className="item-field-manage-inventory">
								{supplyingItem}
							</span>
							<span className="item-field-manage-inventory">
								{/* view button */}
								<button
									className="action-btns-manage-inventory"
									onClick={() => viewItem(_id)}
								>
									<AiOutlineEye />
								</button>

								{/* update button */}
								<button
									className="action-btns-manage-inventory"
									onClick={() => updateItem(_id)}
								>
									<BiEdit />
								</button>

								{/* delete button */}
								<button
									className="action-btns-manage-inventory"
									onClick={() => deleteSupplier(_id)}
								>
									<AiOutlineDelete />
								</button>
							</span>
						</div>
					);
				}
			})}
		</div>
	);
}
