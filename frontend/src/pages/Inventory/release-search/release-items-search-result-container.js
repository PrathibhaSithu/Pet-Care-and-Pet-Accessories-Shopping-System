import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { userRequest } from "../../../requestMethods";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

export default function ReleaseItemsResultsContainer(props) {
	const { items } = props;
	const navigate = useNavigate();

    // navigate to release item form
    const navigateReleaseForm = (id) => {
        navigate("/admin/inventory/release-items", {state:{id}})
    }

	return (
		<div>
			{items.reverse().map((singleItem) => {
				const { _id, itemName, sku, category, price, quantity} = singleItem;

				if (items.length > 0) {
					return (
						<div className="running-short-item" key={_id}>
							<span className="item-field-release-items">
								{itemName}
							</span>
							<span className="item-field-release-items">
								{sku}
							</span>
							<span className="item-field-release-items">
								{category}
							</span>
							<span className="item-field-release-items">
								{price}
							</span>
							<span className="item-field-release-items">
								{quantity}
							</span>
							<span className="item-field-release-items">
								{/* navigate to release button */}
								<button
									className="action-btns-nav-to-rel"
									onClick={() => navigateReleaseForm(_id)}
								>
									Release
								</button>
							</span>
						</div>
					);
				}
			})}
		</div>
	);
}
