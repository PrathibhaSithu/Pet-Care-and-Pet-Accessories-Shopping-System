import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import { userRequest } from '../../../requestMethods';

export default function OrderSearchResultsContainer(props) {
	const { order } = props;

	const [processing , setProcessing] = useState(order)

	useEffect(()=>{
		const newArr = order.filter((item) => {
			return item.deliveryStatus === 'Completed'
		})

		setProcessing(newArr)
	},[])

	const navigate = useNavigate()

	const updateItem = (id) => {
		navigate(`/delivery/update-order`, { state: { id } });
		console.log(id);
	};

	const deleteItem = async(deleteID) => {
		Swal.fire({
			title: 'Confirmation Needed',
			text: "Please confirm your action",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#f44336', // Red color for confirm button
			cancelButtonColor: '#4caf50', // Green color for cancel button      
			confirmButtonText: 'Delete'
		  }).then((result) => {
			if (result.isConfirmed) {
			  console.log('deleted');
			  Swal.fire(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			  )

			  userRequest.delete(`orders/${deleteID}`)
			  .then((res)=>{
			  console.log(res.data)
		})

		const leftItems = processing.filter((item) => {
			return item._id !== deleteID
		})

		setProcessing(leftItems)

			}
		  })
	};

	const deleteUsingMongo = async(deleteID) => {
		
	}

	return (
		<div>
			{processing.reverse().map((singleItem) => {

				const {deliveryStatus , orderId , shipping , _id} = singleItem
				const {address , name , phone} = shipping
				const {city} = address

				if (processing.length > 0) {
					return (
						<div className="order-info" key={_id}>
							<span className="item-field-completed-order">
								{orderId}
							</span>
							<span className="item-field-completed-order">
								{name}
							</span>
							<span className="item-field-completed-order">
								{phone}
							</span>
							<span className="item-field-completed-order">
								{city}
							</span>
							<span className={`${deliveryStatus === 'Pending' ? 'item-field-completed-order pending-order-state' : deliveryStatus === 'Processing' ? 'item-field-completed-order processing-order-state' : 'item-field-completed-order completed-order-state'}`}>
								{deliveryStatus}
							</span>
							<span className="item-field-completed-order">
								{/* <button className="action-btns-view-order" onClick={()=>{updateItem(orderId)}}>
									<BiEdit />
								</button> */}
								<button
									className="action-btns-completed-order"
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
