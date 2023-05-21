import React, { useState, useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout'
import './EditLeave.scss'
import { userRequest } from '../../../requestMethods'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function EditLeave() {

    const { id } = useParams()
    const navigate = useNavigate()
  
    const [staffId,setStaffID] = useState("")
    const [leaveType,setleaveType] = useState("")
    const [reason,setreason] = useState("")
    const [leaveFrom,setleaveFrom] = useState("")
    const [leaveTo,setleaveTo] = useState("")

  
    useEffect(() => {
      userRequest.get('/leave/' + id)
      .then(res => {
        setStaffID(res.data.staffId)
        setleaveType(res.data.leaveType)
        setreason(res.data.reason)
        setleaveFrom(res.data.leaveFrom)
        setleaveTo(res.data.leaveTo)
       
      }).catch(err =>{
          toast.error(err.message)
      })
    }, [id])
  
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      
        userRequest.put("/leave/" + id, {staffId, leaveType, reason, leaveFrom, leaveTo})
        .then(res => {
            toast.success('Leave Deatils updated')
            navigate('/admin/leave/ManageLeave')
        }).catch(err => {
            toast.error(err.message)
        })
      
    }  
    const [maxDate, setMaxDate] = useState(null)

  useEffect(() => {
    const date = new Date();
    setMaxDate(date.toISOString() .split("T")[0])
  }, [])

  
  
    return (
      <AdminLayout>
      <div className="edit-leave-container-main">
          {/* this is the form container */}
          <form className="edit-leave-form-container" onSubmit={handleSubmit}>
              <span className="tagline-edit-leave"> Edit Leave Details</span>
              {/* input field container */} 
              <div className="column-container">
                {/* column one */}
                <div className="edit-leave-column">
                  <section className="input-container">
                    <span className="input-title">Staff ID</span>
                    <input className="input-field" value={staffId} onChange={(e) => setStaffID(e.target.value)} required/>
                  </section>
                  <section className="input-container">
                    <span className="input-title">Leave Type</span>
                    <select className="input-field" value={leaveType} onChange={(e) => setleaveType(e.target.value)} required>
                        <option className='select-option' value="Half Leave">Half Leave</option>
                        <option className='select-option' value="Full Leave">Full Leave</option>
                    </select>
                  </section>
                  <section className="input-container">
                    <span className="input-title">Reasons</span>
                    <input className="input-field" value={reason} onChange={(e) => setreason(e.target.value)} required/>
                  </section>
                  <section className="input-container">
                  <span className="input-title">Leave Reqested</span>
                    <span className="input-title">From</span>
                    <input className="input-field" value={leaveFrom} onChange={(e) => setleaveFrom(e.target.value)}type="date" required/>
                  </section>
                  <section className="input-container">
                    <span className="input-title">To</span>
                    <input className="input-field" value={leaveTo} onChange={(e) => setleaveTo(e.target.value)}type ='date' max={maxDate} required/>
                  </section>
                  <div className="btn-container-edit-leave">
                        <button type='submit' className="submit-btn">Update</button>
                        <button type='reset' className="reset-btn" >Reset</button>
                  </div>
                 
                </div>
                {/* column two */}
                
              </div>
          </form>
      </div>
      </AdminLayout>
    )
  }
  
  export default EditLeave