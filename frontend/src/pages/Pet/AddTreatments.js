import React, {useEffect,useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout'
import './AddTreatments.scss'
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';


const AddTreatments = () => {

   const [petID, setPetID] = useState('')
   const [petName, setPetName] = useState('')
   const [nic, setCustomerNIC] = useState('')
   const [date, setDate] = useState('')
   const [treatment, setTreatment] = useState('')
   const [progressNotes, setProgressNotes] = useState('')

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
  
    userRequest.post("/treatments", { petID, petName, nic, date, treatment, progressNotes })
    .then(res => {
        toast.success('Treatment added')
        handleReset()
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

    <div className="add-treatment-container-main">
        {/* this is the form container */}
        <form className="add-treatment-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-treatment">Add Treatment</span>
            {/* input field container */}
            
              {/* column one */}
              <div className="add-treatment-column">
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
                    <div className="btn-container-add-item">
                      <button type='submit' className="submit-btn">Submit</button>
                      <button type='reset' className="reset-btn" onClick={handleReset}>Reset</button>
                    </div>         
            </div>
        </form>
    </div>

    </AdminLayout>
  )
}

export default AddTreatments