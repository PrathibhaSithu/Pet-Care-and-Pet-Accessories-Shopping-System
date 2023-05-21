import React , {useEffect , useState} from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import './ReleasedItems.scss'
import { userRequest } from '../../../requestMethods'

function ReleasedItems() {

    const [originalDataSet , setOriginalDataSet] = useState([])
    const [releasedList , setReleasedList] = useState([])
    const [loading, setIsLoading] = useState(false)

    useEffect(()=>{
        const fetchIssueRecords = async() => {
            await userRequest.get('release-items/')
            .then((res)=>{
                setOriginalDataSet(res.data)
                setReleasedList(res.data)
                setIsLoading(true)
            })
            .catch((err)=>{
                console.log(err);
                setReleasedList([])
                setOriginalDataSet([])
            })
        }

        fetchIssueRecords()
    },[])

  return (
    <AdminLayout>
        <div className="released-items-container-main">
            {   
                releasedList.map((record) => {
                    
                    const {releaseRecord, sku, itemName, category, quantity, totalCost, staffName, staffID, createdAt} = record

                    return(
                        <div className="released-record-info-card">
                            <div className="prompts-record-info">
                                <span>Record ID</span>
                                <span>SKU</span>
                                <span>Item Name</span>
                                <span>Category</span>
                                <span>Quantity</span>
                                <span>TotalCost</span>
                                <span>EmployeeName</span>
                                <span>EmployeeID</span>
                                <span>Date</span>
                            </div>
                            <div className="values-record-info">
                                <span>{releaseRecord}</span>
                                <span>{sku}</span>
                                <span>{itemName}</span>
                                <span>{category}</span>
                                <span>{quantity}</span>
                                <span>{totalCost}</span>
                                <span>{staffName}</span>
                                <span>{staffID}</span>
                                <span>{loading ? createdAt.toString().substring(0,10) : createdAt}</span>
                            </div>
                        </div>
                    )

                })
            }
        </div>
    </AdminLayout>
  )
}

export default ReleasedItems