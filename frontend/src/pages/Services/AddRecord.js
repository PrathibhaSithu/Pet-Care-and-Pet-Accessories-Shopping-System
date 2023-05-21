import React, { useEffect, useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout'
import './AddRecord.scss'
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';

function AddRecord() {

  //const [recordId, setrecordId] = useState('')
  const [serviceName, setserviceName] = useState("")
  const [customerName, setcustomerName] = useState("")
  const [vetName, setvetName] = useState("")
  const [petType, setpetType] = useState("")
  const [date, setdate] = useState("")
  const [serviceCharge, setserviceCharge] = useState('')


  const handleReset = () => {
  
    //setrecordId('')
    setserviceName('')
    setcustomerName('')
    setvetName('')
    setpetType('')
    setdate('')
    setserviceCharge('')
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    //console.log({ serviceId,customerId,vcslId,petId,date,serviceCharge});

    userRequest.post("/servicerecords", { serviceName,customerName,vetName,petType,date,serviceCharge})
    .then(res => {
        toast.success('Record added')
        handleReset()
    }).catch(err => {
        toast.error(err.message)
    })
  }

  const [maxDate,setMaxDate] = useState(null)
  
  useEffect(()=>{
    const date = new Date();
    setMaxDate(date.toISOString().split("T")[0])
  },[])



  return (
    <AdminLayout>

      <div className="add-record-container-main">
        {/* this is the form container */}
        <form className="add-record-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-record">Add Record</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-record-column">

                {/* <section className="input-container">
                  <span className="input-title">Record ID</span>
                  <input type='text' className="input-field" value={recordId} onChange={(e) => setrecordId(e.target.value)} required/>
                </section> */}

                <section className="input-container">
                  <span className="input-title">Service Name</span>
                  <input type='text' className="input-field" value={serviceName} onChange={(e) => setserviceName(e.target.value)} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Customer Name</span>
                  <input type='text' className="input-field" value={customerName} onChange={(e) => setcustomerName(e.target.value)} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Vet Name</span>
                  <input type='text' className="input-field" value={vetName} onChange={(e) => setvetName(e.target.value)} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Pet Type</span>
                  <input type='text' className="input-field" value={petType} onChange={(e) => setpetType(e.target.value)} required/>
                </section>


                <section className="input-container">
                  <span className="input-title">Date</span>
                  <input className="input-field" value={date} onChange={(e) => setdate(e.target.value)} type="date" max={maxDate} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Service Charge</span>
                  <input type='text' pattern="[0-9]*[.]?[0-9]{0,2}" title='Enter price with up to 2 decimals (e.g. 59.99)' className="input-field" value={serviceCharge} onChange={(e) => setserviceCharge(e.target.value)} required/>
                </section>

                  <div className="btn-container-add-record">
                    <button type='submit' className="submit-btn">Submit</button>
                    <button type='reset' className="reset-btn" onClick={handleReset}>Reset</button>
                  </div>

              </div>   

            </div>
        </form>
      </div>

    </AdminLayout>

  )
}

export default AddRecord