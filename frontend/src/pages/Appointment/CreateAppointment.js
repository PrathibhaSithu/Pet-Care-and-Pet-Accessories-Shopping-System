import React, { useState, useRef } from 'react';
import { publicRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';
import Header from '../../components/store/Header/Header'
import Footer from '../../components/store/Footer'
import './createAppointment.scss'

function CreateAppointment() {

  const [ownerName, setOwnerName] = useState('')
  const [ownerContact, setOwnerContact] = useState('')
  const [petName, setpetName] = useState('')
  const [petAge, setPetAge] = useState('')
  const [petSpecies, setPetSpecies] = useState('Dog')
  const [petGender, setPetGender] = useState('Male')
  const [reason, setReason] = useState('')
  const [date, setDate] = useState('')
  const [additionalNote, setAdditionalNote] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()

    publicRequest.post("/appointments", { ownerName, ownerContact, petName, petAge, petSpecies, petGender, reason, date, additionalNote })
    .then(res => {
        toast.success('Appointment requested')
        handleReset()
    }).catch(err => {
        toast.error(err.message)
    })
  } 

  const handleReset = () => {
    setOwnerName('')
    setOwnerContact('')
    setpetName('')
    setPetAge('')
    setPetSpecies('Dog')
    setPetGender('Male')
    setReason('')
    setDate('')
    setAdditionalNote('')
  }


  return (
    <div>
      <Header />
      <div className="add-appointment-container-main">
        {/* this is the form container */}
        <form className="add-appointment-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-appointment">Book an appointment</span>

            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-appointment-column">

                <section className="input-container">
                  <span className="input-title">Owner name</span>
                  <input type='text' className="input-field" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} 
                    required
                  />
                </section>

                <section className="input-container">
                  <span className="input-title">Pet name</span>
                  <input type='text' className="input-field" value={petName} onChange={(e) => setpetName(e.target.value)} required/>
                </section>
                
                <section className="input-container">
                  <span className="input-title">Pet age</span>
                  <input type='text' className="input-field" value={petAge} onChange={(e) => setPetAge(e.target.value)} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Pet species</span>
                  <select className="input-field" value={petSpecies} onChange={(e) => setPetSpecies(e.target.value)}>
                      <option className='select-option' >Dog</option>
                      <option className='select-option' >Cat</option>
                      <option className='select-option' >Bird</option>
                      <option className='select-option' >Rabbit</option>
                      <option className='select-option' >Guinea Pig</option>
                      <option className='select-option' >Hamster</option>
                      <option className='select-option' >Reptile</option>
                      <option className='select-option' >Fish</option>               
                  </select>
                </section>

                <section className="input-container">
                  <span className="input-title">Pet gender</span>
                  <select className="input-field" value={petGender} onChange={(e) => setPetGender(e.target.value)} required>
                      <option className='select-option' value="Male">Male</option>
                      <option className='select-option' value="Female">Female</option>
                  </select> 
                </section>

                <div className="btn-container-add-appointment">
                    <button type='submit' className="submit-btn">Book Now</button>
                    {/* <button type='reset' className="reset-btn">Reset</button> */}
                </div>


              </div>

              {/* column two */}
              <div className="add-appointment-column">

                <section className="input-container">
                    <span className="input-title">Contact number</span>
                    <input type='text'  className="input-field" value={ownerContact} onChange={(e) => setOwnerContact(e.target.value)} required/>
                </section>
                
                <section className="input-container">
                  <span className="input-title">Date</span>
                  <input type='date' className="input-field" value={date} onChange={(e) => setDate(e.target.value)} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Reason</span>
                  <input type='text' className="input-field" value={reason} onChange={(e) => setReason(e.target.value)} required/>
                </section>

                <section className="input-container">
                    <span className="input-title">Additional note</span>
                    <textarea className='input-textarea' id="" cols="30" rows="10" value={additionalNote} onChange={(e) => setAdditionalNote(e.target.value)} required></textarea>
                </section>


              </div>
            </div>
        </form>
    </div>

    <Footer />
    </div>

  )
}

export default CreateAppointment