import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

export default function OrderSearchResultsContainer(props) {
	const { order } = props;
	order.reverse()
	const navigate = useNavigate()

	const updateItem = (id) => {
		navigate(`/admin/delivery/update-order`, { state: { id } });
		console.log(id);
	};


	return (
		<div>
			{order.map((singleItem) => {
				
				console.log(singleItem)

				const {deliveryStatus , orderId , shipping , _id} = singleItem
				const {address , name , phone} = shipping
				const {city} = address

				if (order.length > 0) {
					return (
						<div className="order-info-view-order" key={_id}>
							<span className="item-field-view-order">
								{orderId}
							</span>
							<span className="item-field-view-order">
								{name}
							</span>
							<span className="item-field-view-order">
								{phone}
							</span>
							<span className="item-field-view-order">
								{city}
							</span>
							<span className={`${deliveryStatus === 'Pending' ? 'item-field-view-order pending-order-state' : deliveryStatus === 'Processing' ? 'item-field-view-order processing-order-state' : 'item-field-view-order completed-order-state'}`}>
								{deliveryStatus}
							</span>
							<span className="item-field-view-order">
								<button className="action-btns-view-orderV1" onClick={()=>{updateItem(_id)}}>
									<BiEdit />
								</button>
							</span>
						</div>
					);
				}
			})}
		</div>
	);
}
