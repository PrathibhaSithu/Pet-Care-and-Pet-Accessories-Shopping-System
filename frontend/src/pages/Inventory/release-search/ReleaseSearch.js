import React , {useState , useEffect} from 'react'
import { userRequest } from '../../../requestMethods';
import { ImSearch } from "react-icons/im";
import './ReleaseSearch.scss'
import AdminLayout from '../../Layouts/AdminLayout'
import ReleaseItemsResultsContainer from './release-items-search-result-container';
import ReleaseItemsMessageDisplayer from './release-item-empty-result-displayer'
import { useNavigate } from 'react-router-dom';

function ReleaseSearch() {

    const [originalItems , setOriginalItems] = useState([])
    const [items, setItems] = useState([]);
	const [searchPrompt, setSearchPrompt] = useState("");
	const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async() => {
            await userRequest.get("inventory/")
            .then((res)=>{
                setOriginalItems(res.data)
                setItems(res.data)
            })
        }

        fetchData()
    },[])

    const searchFunction = (e) => {
        e.preventDefault()
        const resultArr =  originalItems.filter((element)=>{
            return element.itemName.toLowerCase().includes(searchPrompt.replace(/\s/g,""))
        })

        setItems(resultArr)
    }

  return (
    <AdminLayout>
        <div className="actionbar-container-release-items">
				{/*Search bar*/}
				<div className="search-bar-container">
					<input
						type="text"
						className="search-field"
						placeholder="Search by item name"
						value={searchPrompt}
						onChange={(e)=>{setSearchPrompt(e.target.value)}}
					/>
					<form onSubmit={searchFunction}>
						<button type="submit" className="search-btn">
							<ImSearch />
						</button>
					</form>
					<button className="release-records-btn" onClick={()=>{
						navigate("/admin/inventory/released-list")
					}}>
						Release Records
					</button>
				</div>

				{/* data fetching section including buttons*/}

				<div className="search-results-section">
					{/* table headings */}
					<div className="inventory-info-item-head">
						<span className="item-field-head-release-items">
							Item Name
						</span>
						<span className="item-field-head-release-items">
							SKU
						</span>
						<span className="item-field-head-release-items">
							Category
						</span>
                        <span className="item-field-head-release-items">
							Unit Price
						</span>
                        <span className="item-field-head-release-items">
							Quantity in Stock
						</span>
						<span className="item-field-head-release-items">
							Actions
						</span>
					</div>
					{/* scrollable section */}
					<div className="search-results-container">
						{/* display the results */}
						{items.length === 0 ? (
							<ReleaseItemsMessageDisplayer/>
						) : (
							<ReleaseItemsResultsContainer items={items}/>
						)}
					</div>
				</div>
			</div>
    </AdminLayout>
  )
}

export default ReleaseSearch