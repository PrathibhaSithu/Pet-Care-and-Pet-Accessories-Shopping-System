import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import './AddPayroll.scss'
import { userRequest } from '../../../requestMethods'
import { toast } from 'react-hot-toast';


const AddPayroll = () => {

  const[staffId,setstaffId] =  useState("")
  const[otHours,setotHours] =  useState("")
  const[salary,setsalary] =  useState("")
  const[paymentStatus,setpaymentStatus] =  useState("")
  const[date,setdate] =  useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    userRequest.post("/payroll", {staffId,otHours,salary,paymentStatus,date}) 
    .then(res => {
      toast.success('Payroll details added')
      handleReset()
  }).catch(err => {
      toast.error(err.message)
  })
  }

  const handleReset = () => {
    setstaffId('')
    setotHours('')
    setsalary('')
    setpaymentStatus('')
    setdate('')
  }

  const [maxDate, setMaxDate] = useState(null)

  useEffect(() => {
    const date = new Date();
    setMaxDate(date.toISOString().split("T")[0])
  }, [])

  // useEffect(() => {

  // }, [])


  return (
    <AdminLayout>
    <div className="add-payroll-container-main">
        {/* this is the form container */}
        <form className="add-payroll-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-payroll"> Add Payroll Details</span>
            {/* input field container */} 
            <div className="column-container">
              {/* column one */}
              <div className="add-payroll-column">
                <section className="input-container">
                  <span className="input-title">Staff ID</span>
                  <input className="input-field" value={staffId} onChange={(e) => setstaffId(e.target.value)} required/>
                </section>
                <section className="input-container">
                  <span className="input-title">OT Hours</span>
                  <input className="input-field" value={otHours} onChange={(e) => setotHours(e.target.value)}type="number" required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Salary</span>
                  <input className="input-field" value={salary} onChange={(e) => setsalary(e.target.value)}type="text" title='Enter price with up to 2 decimals (e.g. 59.99)' required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Payment Status</span>
                  <select className="input-field" value={paymentStatus} onChange={(e) => setpaymentStatus(e.target.value)} required>
                      <option className='select-option' value="">Select payment status</option>
                      <option className='select-option' value="Paid">Paid</option>
                      <option className='select-option' value="Unpaid">Unpaid</option>
                  </select>
                </section>
                <section className="input-container">
                  <span className="input-title">Date</span>
                  <input className="input-field" value={date} onChange={(e) => setdate(e.target.value)}type ='date' max={maxDate} required/>
                </section>
                <div className="btn-container-add-payroll">
                      <button type='submit' className="submit-btn">Submit</button>
                      <button type='reset' className="reset-btn" onClick={handleReset}>Reset</button>
                </div>
               
              </div>
              {/* column two */}
              
            </div>
        </form>
    </div>
    </AdminLayout>
  )
  
 }

export default AddPayroll