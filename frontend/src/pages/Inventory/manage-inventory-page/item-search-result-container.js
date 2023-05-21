import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import api from "../../../services/api";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import {userRequest} from '../../../requestMethods'

export default function ItemSearchResultsContainer(props) {
	const { inventory, setFunc } = props;
	const navigate = useNavigate();

	// view function
	const viewItem = (id) => {
		navigate("/admin/inventory/view-item", { state: { id } });
	};

	// update function
	const updateItem = (id) => {
		navigate(`/admin/inventory/update-item`, { state: { id } });
		console.log(id);
	};

	// delete function
	const deleteItem = (deletingID) => {
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
					Swal.fire(
						"Deleted!",
						"Your file has been deleted.",
						"success"
					);

					await userRequest.delete(`inventory/${deletingID}`)
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error);
						});

					const newSet = inventory.filter((object) => {
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
			{inventory.reverse().map((singleItem) => {
				const { _id, itemName, sku, category, manufacturer, quantity } =
					singleItem;

				const inventoryPassBucket = {
					_id,
					itemName,
					sku,
					category,
					manufacturer,
					quantity,
				};

				if (inventory.length > 0) {
					return (
						<div className="running-short-item" key={_id}>
							<span className="item-field-manage-inventory">
								{itemName}
							</span>
							<span className="item-field-manage-inventory">
								{sku}
							</span>
							<span className="item-field-manage-inventory">
								{category}
							</span>
							<span className="item-field-manage-inventory">
								{manufacturer}
							</span>
							<span className="item-field-manage-inventory">
								{quantity}
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
									onClick={() => deleteItem(_id)}
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
