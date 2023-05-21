import React , {useState , useEffect} from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { ImSearch } from "react-icons/im";
import ResultContainer from "./supplier-search-result-container";
import NoSuppliersDisplayer from "./supplier-empty-result-displayer";
import { userRequest } from '../../../requestMethods';


function ManageSupplierWindow() {
  	const [suppliers, setSuppliers] = useState([]);
	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {

		const fetchAllSuppliers = async() => {
			userRequest.get("suppliers/").then((response) => {
				setSuppliers(response.data);
				console.log(suppliers);
			});
		}

		fetchAllSuppliers()
	}, []);
	

	const filteringDeleted = (data) => {
		setSuppliers(data)
	}

	const searchFieldHandler = (e) => {
		setSearchPrompt(e.target.value);
	};

	const searchFunction = async() => {
		await userRequest.get(`suppliers/${searchPrompt}`)
			.then((response) => {
				if (response.status === 200) {
					console.log(response);
					setSuppliers(response.data);
				} else {
					console.log("no such item");
					setSuppliers([]);
				}
			})
			.catch((error) => {
				console.log("there is an error");
				setSuppliers([]);
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
						placeholder="Search by Agent ID"
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
							Company
						</span>
						<span className="item-field-head-manage-inventory">
							Agent Name
						</span>
						<span className="item-field-head-manage-inventory">
							Agent ID
						</span>
						<span className="item-field-head-manage-inventory">
							Supp. Category
						</span>
						<span className="item-field-head-manage-inventory">
							Supplying Item
						</span>
						<span className="item-field-head-manage-inventory">
							Actions
						</span>
					</div>
					{/* scrollable section */}
					<div className="search-results-container">
						{/* display the results */}
						{suppliers.length === 0 ? (
							<NoSuppliersDisplayer />
						) : (
							<ResultContainer suppliers={suppliers} setFunc={filteringDeleted}/>
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export default ManageSupplierWindow