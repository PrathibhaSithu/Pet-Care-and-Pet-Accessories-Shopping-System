import React, { useState ,useEffect } from 'react'
import value from '../../../assets/imgs/hero-sec-image/balance.png'
import PrLvMed from '../../../components/inventory-signals/PrLvlMedium'
import PrLvHigh from '../../../components/inventory-signals/PrLvlHigh'
import AdminLayout from '../../Layouts/AdminLayout'
import './overview.scss'
import InventoryReport from '../../Reports/InventoryReport'
import SupplierReport from '../../Reports/SupplierReport'
import ReleaseItemsReport from '../../Reports/ReleaseItemsReport'
import {userRequest} from '../../../requestMethods'
import clinicEquipment from '../../../assets/imgs/PrototypeResources/insight-cards/pharmaceutical.png'
import storeEquipment from '../../../assets/imgs/PrototypeResources/insight-cards/pet-food.png'
import supplier from '../../../assets/imgs/PrototypeResources/insight-cards/supplier.png'

// This is the overview component. all the things related to this component goes here
function OverviewComponent() {


  // hooks and other data reading logics
  const [inventory , setInventory] = useState([])
  const [releasedRecords, setReleasedRecords] = useState([])
  const [supplierCount , setSupplierCount] = useState([])

  useEffect(()=>{
    
    const fetchAll = async() => {
      await userRequest.get("inventory/").then((response)=>{setInventory(response.data)})
      console.log(inventory);
  
      await userRequest.get("suppliers/").then((response)=>{setSupplierCount(response.data)})
      console.log(supplierCount);

      await userRequest.get("release-items/").then((response)=>{setReleasedRecords(response.data)})
      console.log(releasedRecords);
    }

    fetchAll()
  },[])

  let pharmCount = 0
  let petItemCount = 0
  let totalCount = 0

  inventory.map((singleItem)=>{
    const {category , quantity , price} = singleItem;

    totalCount += quantity * price


    if(category === 'clinical-item'){
      pharmCount++
    }
    else if(category === 'store-item'){
      petItemCount++
    }
  })

  return (
    <AdminLayout>
    <div className="main-container">
      {/* this displays how many types of products are currently on the stock */}
        <div className="overall-report-bar">
            <div className="insight-card">
                <img src={clinicEquipment} alt="" className="insight-card-pic" />
                <div className="insight-card-details">
                  <span className="item-count-displayer">{pharmCount < 10 ? `0${pharmCount}` : pharmCount}</span>
                  <span className="insight-card-title">Pharmaceuticals</span>
                </div>
            </div>

            <div className="insight-card">
                <img src={storeEquipment} alt="" className="insight-card-pic" />
                <div className="insight-card-details">
                  <span className="item-count-displayer">{petItemCount < 10 ? `0${petItemCount}` : petItemCount}</span>
                  <span className="insight-card-title">Pet Store Items</span>
                </div>
            </div>

            <div className="insight-card">
                <img src={supplier} alt="" className="insight-card-pic" />
                <div className="insight-card-details">
                  <span className="item-count-displayer">{supplierCount.length < 10 ? `0${supplierCount.length}` : supplierCount.length}</span>
                  <span className="insight-card-title">Suppliers</span>
                </div>
            </div>

            <div className="insight-card">
                <img src={value} alt="" className="insight-card-pic" />
                <div className="insight-card-details">
                  <span className="item-count-displayer">{totalCount < 10 ? `0${totalCount}` : totalCount}</span>
                  <span className="insight-card-title">LKR Inventory Worth</span>
                </div>
            </div>
            
        </div>
            <div className="report-gen-section-inventory">
              <InventoryReport data={inventory}/>
              <SupplierReport data={supplierCount}/>
              <ReleaseItemsReport data={releasedRecords}/>
            </div>
        {/* Runnnig on short displayer */}
        <div className="row-heading">Limited Availability Items</div>
        <div className="second-row-container">
            <div className="running-short-item-head">
                  <span className="item-field-head">Item Name</span>
                  <span className="item-field-head">SKU</span>
                  <span className="item-field-head">Category</span>
                  <span className="item-field-head">Available Qty.</span>
                  <span className="item-field-head">Priority Level</span>
            </div>
          
            <div className="running-short-container">
                {
                  inventory.reverse().map((singleItem)=>{
                      const {_id, sku , itemName , category , reorderLevel  , price , rackNo , quantity , manufacturer} = singleItem
                      
                      if(Number(quantity) < reorderLevel){
                        return(
                        <div className="running-short-item" key={_id}>
                            <span className="item-field">{itemName}</span>
                            <span className="item-field">{sku}</span>
                            <span className="item-field">{category}</span>
                            <span className="item-field">{quantity}</span>
                            <span className="item-field">{quantity < 5 ? <PrLvHigh/> : <PrLvMed/>}</span>
                        </div>
                      )
                      }
                  }) 
                }
            </div>
        </div>
    </div>
    </AdminLayout>
  )
}

export default OverviewComponent