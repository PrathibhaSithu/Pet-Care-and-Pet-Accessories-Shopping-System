import React, { useState, useEffect } from 'react';
import AdminLayout from '../Layouts/AdminLayout'
import './EditRecord.scss';
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';


function EditRecord() {

  const { id } = useParams()
  const navigate = useNavigate()

  //const [recordId, setrecordId] = useState('')
  const [serviceName, setserviceName] = useState("")
  const [customerName, setcustomerName] = useState("")
  const [vetName, setvetName] = useState("")
  const [petType, setpetType] = useState("")
  const [date, setdate] = useState("")
  const [serviceCharge, setserviceCharge] = useState('')


  useEffect(() => {
    userRequest.get('/servicerecords/' + id)
    .then(res => {
        //setrecordId(res.data.recordId)
        setserviceName(res.data.serviceName)
        setcustomerName(res.data.customerName)
        setvetName(res.data.vetName)
        setpetType(res.data.petType)
        setdate(res.data.date)
        setserviceCharge(res.data.serviceCharge)
       
    }).catch(err =>{
        toast.error(err.message)
    })
  }, [id])


  const handleSubmit = async (e) => {
    e.preventDefault()

    userRequest.put("/servicerecords/" + id, { serviceName,customerName,vetName,petType, date, serviceCharge })
    .then(res => {
        toast.success('Record updated')
        navigate('/admin/service/ManageRecords')
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
      <div className="edit-record-container-main">
        {/* this is the form container */}
        <form className="edit-record-form-container" onSubmit={handleSubmit}>
            <span className="tagline-edit-record">Edit Record</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="edit-record-column">

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

                <div className="btn-container-edit-record">
                  <button type='submit' className="submit-btn">Update</button>
                  <button type='reset' className="reset-btn">Reset</button>
                </div>

              </div>   

            </div>
        </form>
    </div>

    </AdminLayout>

  )
}

export default EditRecord
                   