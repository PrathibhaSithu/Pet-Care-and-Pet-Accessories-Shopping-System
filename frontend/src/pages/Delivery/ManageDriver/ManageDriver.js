import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../Layouts/AdminLayout";
import ResultContainer from "./drivers-search-result-container";
import NoItemsDisplayer from "./drivers-empty-result-diplayer";
import "./ManageDriver.scss";
import DriverReport from "../DeliveryReport/DeliveryReport";
import { userRequest } from '../../../requestMethods'

function ManageDriverComponent() {
	const [drivers, setDrivers] = useState([]);
	const [originDrivers , setOriginDrivers] = useState([])
	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {
		userRequest.get("/drivers").then((response) => {
			setOriginDrivers(response.data)
			setDrivers(response.data);
		});
	}, []);

	const searchFieldHandler = (e) => {
		setSearchPrompt(e.target.value);
	};

	// const searchAllField = () => {
	// 	const results = originDrivers.filter((singleDriver)=>{
	// 		const driverProps = Object.values(singleDriver)
	// 		return driverProps.some((value)=>{
	// 			return value && value.toString().toLowerCase().replace(/\s/g,"").includes(searchPrompt.toLowerCase())
	// 		})
	// 	})

	// 	setDrivers(results)
	// }
	

	const searchFunction = () => {
		// userRequest.get(`/drivers/${searchPrompt}`)
		// 	.then((response) => {
		// 		if (response.status === 200) {
		// 			console.log(response);
		// 			setDrivers(response.data);
		// 		} else {
		// 			console.log("no such item");
		// 			setDrivers([]);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log("no such item");
		// 		console.log(error);
		// 	});	
		const resultArr = originDrivers.filter((driver)=>{
			return driver.driverName.toLowerCase().includes(searchPrompt)
		})
		setDrivers(resultArr)
	};

	const searchFormHandler = (e) => {
		e.preventDefault();
		console.log(searchPrompt);
		searchFunction();
		//searchAllField();
		setSearchPrompt("");
	};

	return (
		<AdminLayout>
			<div className="actionbar-container-manage-driver">
				{/* main headline */}
				{/*Search bar*/}
				<div className="search-bar-container-manage-driver">
					<input
						type="text"
						className="search-field-manage-driver"
						placeholder="Search by Driver Name"
						value={searchPrompt}
						onChange={searchFieldHandler}
					/>
					<form onSubmit={searchFormHandler}>
						<button type="submit" className="search-btn-manage-driver">
							<ImSearch />
						</button>
					</form>
					<DriverReport data={drivers}/>
				</div>

				{/* data fetching section including buttons*/}

				<div className="search-results-section-manage-driver">
					{/* table headings */}
					<div className="driver-info-item-head">
						<span className="item-field-head-manage-driver">
							Driver Name
						</span>
						<span className="item-field-head-manage-driver">
							NIC No
						</span>
						<span className="item-field-head-manage-driver">
							Phone No
						</span>
						<span className="item-field-head-manage-driver">
							Vehicle No
						</span>
						<span className="item-field-head-manage-driver">
							Vehicle Type
						</span>
						<span className="item-field-head-manage-driver">
							Status
						</span>
						<span className="item-field-head-manage-driver"></span>
					</div>
					{/* scrollable section */}

					<div className="search-results-container-manage-driver">
						{/* display the results */}
						{drivers.length === 0 ? (
							<NoItemsDisplayer />
						) : (
							<ResultContainer driver={drivers} />
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export default ManageDriverComponent;
