import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../Layouts/AdminLayout";
import ResultContainer from "./orders-search-result-container";
import NoItemsDisplayer from "./orders-empty-result-displayer";
import { userRequest } from '../../../requestMethods';
import "./ProcessingOrder.scss";

function ViewProcessingOrderComponent() {
	const [orders, setOrders] = useState([]);
	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {
		userRequest.get("/deliver-orders").then((response) => {
			setOrders(response.data);
		});
	}, []);


	// const processingOrders = orders.filter((order)=>{
	// return order.deliveryStatus === "Processing"
	// })

	const searchFieldHandler = (e) => {
		setSearchPrompt(e.target.value);
	};

	const searchFunction = async() => {
		await userRequest.get(`deliver-orders/${searchPrompt}`)
			.then((response) => {
				setOrders(response.data);
			})
			.catch((error) => {
				console.log("no such item");
				console.log(error);
				setOrders([])
			});
	};

	const executeFrontendSearch = () => {

	}

	const searchFormHandler = (e) => {
		e.preventDefault();
		console.log(searchPrompt);
		searchFunction();
		setSearchPrompt("");
	};

	return (
		<AdminLayout>
			<div className="actionbar-container-processing-order">
				{/* main headline */}
				{/*Search bar*/}
				{/* <div className="search-bar-container-processing-order">
					<input
						type="text"
						className="search-field-processing-order"
						placeholder="Search order by order ID"
						value={searchPrompt}
						onChange={searchFieldHandler}
					/>
					<form onSubmit={searchFormHandler}>
						<button type="submit" className="search-btn-processing-order">
							<ImSearch />
						</button>
					</form>
				</div> */}

				{/* data fetching section including buttons*/}

				<div className="search-results-section-processing-order">
					{/* table headings */}
					<div className="order-info-item-head-processing-order">
						<span className="item-field-head-processing-order">
							Order ID
						</span>
						<span className="item-field-head-processing-order">
							Customer Name
						</span>
						<span className="item-field-head-processing-order">
							Customer Phone
						</span>
						<span className="item-field-head-processing-order">
							Delivery Location
						</span>
						<span className="item-field-head-processing-order">
							Delivery Status
						</span>
						<span className="item-field-head-processing-order"></span>
					</div>
					{/* scrollable section */}

					<div className="search-results-container-processing-order">
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

export default ViewProcessingOrderComponent;
