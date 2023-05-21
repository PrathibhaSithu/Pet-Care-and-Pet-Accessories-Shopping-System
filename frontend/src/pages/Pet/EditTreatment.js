import React, { useState, useEffect } from 'react';
import AdminLayout from '../Layouts/AdminLayout'
import './EditTreatment.scss'
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function EditTreatment() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [petID, setPetID] = useState('')
  const [petName, setPetName] = useState('')
  const [nic, setCustomerNIC] = useState('')
  const [date, setDate] = useState('')
  const [treatment, setTreatment] = useState('')
  const [progressNotes, setProgressNotes] = useState('')
   
  useEffect(() => {
    userRequest.get('/treatments/' + id)
    .then(res => {
        setPetID(res.data.petID)
        setPetName(res.data.petName)
        setCustomerNIC(res.data.nic)
        setDate(res.data.date)
        setTreatment(res.data.treatment)
        setProgressNotes(res.data.progressNotes)
        
    }).catch(err =>{
        toast.error(err.message)
    })
  }, [id])
 
  const handleReset = () => {
    setPetID('')
    setPetName('')
    setCustomerNIC('')
    setDate('')
    setTreatment('')
    setProgressNotes('')

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    userRequest.put("/treatments/" + id, {petID, petName, nic, date, treatment, progressNotes })
    .then(res => {
        toast.success('Treatment updated')
        navigate('/admin/treatments/ManageTreatments')
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
      <div className="edit-treatment-container-main">
        {/* this is the form container */}
        <form className="edit-treatment-form-container" onSubmit={handleSubmit}>
            <span className="tagline-edit-treatment">Edit Treatment</span>
            {/* input field container */}
            
              {/* column one */}
              <div className="edit-treatment-column">
                <section className="input-container"> 
                  <span className="input-title">Pet ID</span>
                  <input className="input-field" value={petID} required onChange={(e) => setPetID(e.target.value)}/>
                </section>
                <section className="input-container"> 
                  <span className="input-title">Pet Name</span>
                  <input className="input-field" value={petName} required onChange={(e) => setPetName(e.target.value)}/>
                </section>
                <section className="input-container"> 
                  <span className="input-title">NIC</span>
                  <input className="input-field" value={nic} required onChange={(e) => setCustomerNIC(e.target.value)}/>
                </section>
               
                <section className="input-container">
                  <span className="input-title">Date</span>
                  <input className="input-field" type="date" id="date" name="date" max={maxDate} value={date} required onChange={(e) => setDate(e.target.value)}/>
                </section>
              
               <section className="input-container">
                  <span className="input-title">Treatments</span>
                  <textarea className='input-textarea' id="" cols="30" rows="10" value={treatment} required onChange={(e) => setTreatment(e.target.value)}></textarea>
                </section>
               
                <section className="input-container">
                  <span className="input-title">Progress Notes</span>
                  <textarea className='input-textarea' id="" cols="30" rows="10" value={progressNotes} required onChange={(e) => setProgressNotes(e.target.value)}></textarea>
                </section>
                    <div className="btn-container-edit-treatment">
                      <button type='submit' className="submit-btn">Submit</button>
                      <button type='reset' className="reset-btn" onClick={handleReset}>Reset</button>
                    </div>
              
            </div>
        </form>
    </div>
    </AdminLayout>

  )
}

export default EditTreatment