import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../Layouts/AdminLayout";
import ResultContainer from "./orders-search-result-container";
import NoItemsDisplayer from "./orders-empty-result-displayer";
import "./CompletedOrder.scss";
import { userRequest } from '../../../requestMethods'

function ViewCompletedOrderComponent() {
	const [orders, setOrders] = useState([]);
	const [root, setRoot] = useState([])
	const [searchPrompt, setSearchPrompt] = useState("");
	useEffect(() => {
		const fetcher = async() => {
			await userRequest.get("/deliver-orders/").then((response) => {
				setOrders(response.data);
				setRoot(response.data)
				console.log('use effect called');
			});
		}
		fetcher()
	},[]);

	// const searchFieldHandler = (e) => {
	// 	setSearchPrompt(e.target.value);
	// };

	// const searchFunction = () => {
	// 	userRequest.get(`/deliver-orders/${searchPrompt}`)
	// 		.then((response) => {
	// 			if (response.status === 200) {
	// 				console.log(response);
	// 				setOrders(response.data);
	// 				console.log(searchPrompt);
	// 			} else {
	// 				console.log("no such item");
	// 				setOrders([]);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log("no such item");
	// 			console.log(error);
	// 			setOrders([])
	// 		});
	// };

	const extendedFrontendSearch = () => {
		const results = root.filter((order)=>{
			return order.orderId === searchPrompt
		})
		
		if(results.length === 0){
			setOrders([])
			console.log("empty array recieved");
		}
		setOrders(results)
		console.log(orders);
	}

	const searchFormHandler = (e) => {
		e.preventDefault()
		extendedFrontendSearch()
		setSearchPrompt("");
	};

	return (
		<AdminLayout>
			<div className="actionbar-container-completed-order">
				{/* main headline */}
				{/*Search bar*/}
				{/* <div className="search-bar-container-completed-order">
					<form onSubmit={searchFormHandler}>
						<input
							type="text"
							className="search-field-completed-order"
							placeholder="Search order by order ID"
							value={searchPrompt}
							onChange={(e)=>{setSearchPrompt(e.target.value)}}
						/>
						<button type="submit" className="search-btn-completed-order">
							<ImSearch />
						</button>
					</form>
				</div> */}

				{/* data fetching section including buttons*/}

				<div className="search-results-section-completed-order">
					{/* table headings */}
					<div className="order-info-item-head-completed-order">
						<span className="item-field-head-completed-order">
							Order ID
						</span>
						<span className="item-field-head-completed-order">
							Customer Name
						</span>
						<span className="item-field-head-completed-order">
							Customer Phone
						</span>
						<span className="item-field-head-completed-order">
							Delivery Location
						</span>
						<span className="item-field-head-completed-order">
							Delivery Status
						</span>
						<span className="item-field-head-completed-order"></span>
					</div>
					{/* scrollable section */}

					<div className="search-results-container-completed-order">
						{/* display the results */}
						{orders.length === 0 ? (
							<NoItemsDisplayer />
						) : (
							<ResultContainer order={orders} />
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export default ViewCompletedOrderComponent;
