import React, { useState } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import './AddLeave.scss'
import { userRequest } from '../../../requestMethods'
import { toast } from 'react-hot-toast';



const AddLeave = () => {
  const [staffId,setStaffID] = useState("")
  const [leaveType,setleaveType] = useState("")
  const [reason,setreason] = useState("")
  const [leaveFrom,setleaveFrom] = useState("")
  const [leaveTo,setleaveTo] = useState("")

const handleSubmit = async (e) => {
  e.preventDefault()
  userRequest.post("/leave", {staffId,leaveType,reason,leaveFrom,leaveTo})
  .then(res => {
    toast.success('Leave details added')
    handleReset()
}).catch(err => {
    toast.error(err.message)
})
}

const handleReset = () => {
  setStaffID('')
  setleaveType('')
  setreason('')
  setleaveFrom('')
  setleaveTo('')
  
  //document.getElementById('file-input').value = '';
}
  return (
    <AdminLayout>
    <div className="add-leave-container-main">
        {/* this is the form container */}
        <form className="add-leave-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-leave"> Leave Request Form</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-leave-column">
                <section className="input-container">
                  <span className="input-title">Staff ID</span>
                  <input className="input-field" value={staffId} onChange={(e) => setStaffID(e.target.value)} required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Leave Type</span>
                  <select className="input-field" value={leaveType} onChange={(e) => setleaveType(e.target.value)} required>
                      <option className='select-option' value="">Select Leave Type</option>
                      <option className='select-option' value="half-leave">Half leave</option>
                      <option className='select-option' value="full-leave">Full leave</option>
                  </select>
                </section>
                <section className="input-container">
                  <span className="input-title">Reason</span>
                  
                  <input className="input-field" value={reason} onChange={(e) => setreason(e.target.value)} required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Leave Reqested</span>
                  <span className="input-title">From</span>
                  <input className="input-field" value={leaveFrom} onChange={(e) => setleaveFrom(e.target.value)} type='date' required/>
                </section>
                <section className="input-container">
                  <span className="input-title">To</span>
                  <input className="input-field" value={leaveTo} onChange={(e) => setleaveTo(e.target.value)} type='date' required/>
                </section>
                <div className="btn-container-add-leave">
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

export default AddLeave