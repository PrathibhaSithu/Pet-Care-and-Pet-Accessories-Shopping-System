import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import ResultContainer from "./item-search-result-container";
import NoItemsDisplayer from "./item-empty-result-diplayer";
import AdminLayout from "../../Layouts/AdminLayout";
import "./manage-inventory.scss";
import {userRequest} from '../../../requestMethods'


function ManageInventoryComponent() {

	const [inventory, setInventory] = useState([]);

	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {
			const fetchData = async() => {
				await userRequest.get("inventory/")
				.then((response) => {
					setInventory(response.data)});
				}
			
			fetchData()
	}, []);
	

	const filteringDeleted = (data) => {
		setInventory(data)
	}

	const searchFieldHandler = (e) => {
		setSearchPrompt(e.target.value);
	};

	const searchFunction = async() => {
		userRequest.get(`inventory/${searchPrompt}`)
			.then((response) => {
				if (response.status === 200) {
					console.log(response);
					setInventory(response.data);
				} else {
					console.log("no such item");
					setInventory([]);
				}
			})
			.catch((error) => {
				console.log("there is an error");
				setInventory([]);
				console.log(error);
			});
	};

	const searchFormHandler = (e) => {
		e.preventDefault();
		console.log(searchPrompt);
		searchFunction();
		setSearchPrompt("");
	};

	return (
		<AdminLayout>
			<div className="actionbar-container-manage-inventory">
				{/* main headline */}
				{/*Search bar*/}
				<div className="search-bar-container">
					<input
						type="text"
						className="search-field"
						placeholder="Search by SKU ID"
						value={searchPrompt}
						onChange={searchFieldHandler}
					/>
					<form onSubmit={searchFormHandler}>
						<button type="submit" className="search-btn">
							<ImSearch />
						</button>
					</form>
				</div>

				{/* data fetching section including buttons*/}

				<div className="search-results-section">
					{/* table headings */}
					<div className="inventory-info-item-head">
						<span className="item-field-head-manage-inventory">
							Item Name
						</span>
						<span className="item-field-head-manage-inventory">
							SKU ID
						</span>
						<span className="item-field-head-manage-inventory">
							Category
						</span>
						<span className="item-field-head-manage-inventory">
							Manufacturer
						</span>
						<span className="item-field-head-manage-inventory">
							Quantity
						</span>
						<span className="item-field-head-manage-inventory">
							Actions
						</span>
					</div>
					{/* scrollable section */}
					<div className="search-results-container">
						{/* display the results */}
						{inventory.length === 0 ? (
							<NoItemsDisplayer />
						) : (
							<ResultContainer inventory={inventory} setFunc={filteringDeleted}/>
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export default ManageInventoryComponent;
