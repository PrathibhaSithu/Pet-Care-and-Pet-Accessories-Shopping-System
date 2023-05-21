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

	const [processing , setProcessing] = useState(order)

	useEffect(()=>{
		const newArr = order.filter((item) => {
			return item.deliveryStatus === 'Processing'
		})

		setProcessing(newArr)
	},[])
	

	

	const navigate = useNavigate()

	const updateItem = (id) => {
		navigate(`/admin/delivery/update-order`, { state: { id } });
		console.log(id);
	};


	return (
		<div>
			{processing.reverse().map((singleItem) => {

				const {deliveryStatus , orderId , shipping , _id} = singleItem
				const {address , name , phone} = shipping
				const {city} = address

				if (processing.length > 0) {
					return (
						<div className="order-info-processing-order" key={_id}>
							<span className="item-field-processing-order">
								{orderId}
							</span>
							<span className="item-field-processing-order">
								{name}
							</span>
							<span className="item-field-processing-order">
								{phone}
							</span>
							<span className="item-field-processing-order">
								{city}
							</span>
							<span className={`${deliveryStatus === 'Pending' ? 'item-field-processing-order pending-order-state' : deliveryStatus === 'Processing' ? 'item-field-processing-order processing-order-state' : 'item-field-processing-order completed-order-state'}`}>
								{deliveryStatus}
							</span>
							<span className="item-field-processing-order">
								<button className="action-btns-processing-orderV2" onClick={()=>{updateItem(_id)}}>
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
