import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../Layouts/AdminLayout'
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import './editAppointment.scss'

function EditAppointment() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [ownerName, setOwnerName] = useState('')
  const [ownerContact, setOwnerContact] = useState('')
  const [petName, setpetName] = useState('')
  const [petAge, setPetAge] = useState('')
  const [petSpecies, setPetSpecies] = useState('')
  const [petGender, setPetGender] = useState('')
  const [reason, setReason] = useState('')
  const [date, setDate] = useState('')
  const [additionalNote, setAdditionalNote] = useState('')
  const [status, setStatus] = useState('')
  const [vet, setVet] = useState('')


  useEffect(() => {
    userRequest.get('/appointments/' + id)
    .then(res => {
        setOwnerName(res.data.ownerName)
        setOwnerContact(res.data.ownerContact)
        setpetName(res.data.petName)
        setPetAge(res.data.petAge)
        setPetSpecies(res.data.petSpecies)
        setPetGender(res.data.petGender)
        setReason(res.data.reason)
        setDate(res.data.date)
        setAdditionalNote(res.data.additionalNote)
        setStatus(res.data.status)
        setVet(res.data.vet)
    }).catch(err =>{
        toast.error(err.message)
    })
  }, [id])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (status === "Completed" && vet.trim() === "") {
      toast.error('Please provide the name of the veterinary surgeon for completed appointments');
      return;
    }

    userRequest.put("/appointments/" + id, { ownerName, ownerContact, petName, petAge, petSpecies, petGender, reason, date, additionalNote, status, vet })
    .then(res => {
        toast.success('Appointment updated')
        navigate('/admin/appointments/manageAppointments')
    }).catch(err => {
        toast.error(err.message)
    })
    
  }  


  return (
    <AdminLayout>
      <div className="edit-appointment-container-main">
        {/* this is the form container */}
        <form className="edit-appointment-form-container" onSubmit={handleSubmit}>
            <span className="tagline-edit-appointment">Edit appointment</span>

            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="edit-appointment-column">

                <section className="input-container">
                  <span className="input-title">Owner name</span>
                  <input type='text' className="input-field" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required/>
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

                <section className="input-container">
                    <span className="input-title">Veterinary Surgeon</span>
                    <input type='text'  className="input-field" value={vet} onChange={(e) => setVet(e.target.value)} />
                </section>

              </div>

              {/* column two */}
              <div className="edit-appointment-column">

                <section className="input-container">
                    <span className="input-title">Contact number</span>
                    <input type='tel'  className="input-field" value={ownerContact} onChange={(e) => setOwnerContact(e.target.value)} required/>
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

                <section className="input-container">
                  <span className="input-title">Status</span>
                  <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)} required>
                      <option className='select-option' value="Pending">Pending</option>
                      <option className='select-option' value="Approved">Approved</option>
                      <option className='select-option' value="Completed">Completed</option>
                      <option className='select-option' value="Cancelled">Cancelled</option>
                  </select> 
                </section>

                <div className="btn-container-edit-appointment">
                    <button type='submit' className="submit-btn">Update</button>
                </div>


              </div>
            </div>
        </form>
      </div>
    </AdminLayout>

  )
}

export default EditAppointment