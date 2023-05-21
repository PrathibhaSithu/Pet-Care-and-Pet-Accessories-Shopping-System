import React, { useState, useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout'
import './EditPayroll.scss'
import { userRequest } from '../../../requestMethods'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function EditPayroll() {

    const { id } = useParams()
    const navigate = useNavigate()
  
    const[staffId,setstaffId] =  useState("")
    const[otHours,setotHours] =  useState("")
    const[salary,setsalary] =  useState("")
    const[paymentStatus,setpaymentStatus] =  useState("")
    const[date,setdate] =  useState("")
    
  
    useEffect(() => {
      userRequest.get('/payroll/' + id)
      .then(res => {
        setstaffId(res.data.staffId)
        setotHours(res.data.otHours)
        setsalary(res.data.salary)
        setpaymentStatus(res.data.paymentStatus)
        setdate(res.data.date)
       
      }).catch(err =>{
          toast.error(err.message)
      })
    }, [id])
  
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      
        userRequest.put("/payroll/" + id, {staffId,otHours,salary,paymentStatus,date })
        .then(res => {
            toast.success('Payroll Deatils updated')
            navigate('/admin/payroll/ManagePayroll')
        }).catch(err => {
            toast.error(err.message)
        })
      
    }  
    const [maxDate, setMaxDate] = useState(null)

  useEffect(() => {
    const date = new Date();
    setMaxDate(date.toISOString().split("T")[0])
  }, [])


  
    return (
      <AdminLayout>
      <div className="edit-payroll-container-main">
          {/* this is the form container */}
          <form className="edit-payroll-form-container" onSubmit={handleSubmit}>
              <span className="tagline-edit-payroll">Edit Payroll Details</span>
              {/* input field container */} 
              <div className="column-container">


                <div className="edit-payroll-column">
                  <section className="input-container">
                    <span className="input-title">Staff ID</span>
                    <input className="input-field" value={staffId} onChange={(e) => setstaffId(e.target.value)} required/>
                  </section>
                  <section className="input-container">
                    <span className="input-title">OT Hours</span>
                    <input className="input-field" value={otHours} onChange={(e) => setotHours(e.target.value)} type="number" required/>
                  </section>
                  <section className="input-container">
                    <span className="input-title">Salary</span>
                    <input className="input-field" value={salary} onChange={(e) => setsalary(e.target.value)} type="text" required/>
                  </section>
                  <section className="input-container">
                    <span className="input-title">Payment Status</span>
                    <select className="input-field" value={paymentStatus} onChange={(e) => setpaymentStatus(e.target.value)} required>
                        <option className='select-option' value="Paid">Paid</option>
                        <option className='select-option' value="Unpaid">Unpaid</option>
                    </select>
                  </section>
                  <section className="input-container">
                    <span className="input-title">Date</span>
                    <input className="input-field" value={date} onChange={(e) => setdate(e.target.value)}type ='date' max={maxDate} required/>
                  </section>
                  <div className="btn-container-edit-payroll">
                        <button type='submit' className="submit-btn">Submit</button>
                        <button type='reset' className="reset-btn" >Reset</button>
                  </div>
                 
                </div>
                
              </div>
          </form>
      </div>
      </AdminLayout>
    )
  }
  
  export default EditPayroll