import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';

import './viewAppointment.scss'

function ViewAppointment() {

    const { id } = useParams()

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

    return (
        <AdminLayout>
            <div className='appointment'>

                <div className='appointment-record-container'>
                    <div className = "appointment-details-container">
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Pet owner name</span>
                            <span className='appointment-line-info-values'>{ownerName}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Contact number</span>
                            <span className='appointment-line-info-values'>{ownerContact}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Pet name</span>
                            <span className='appointment-line-info-values'>{petName}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Pet age</span>
                            <span className='appointment-line-info-values'>{petAge}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Pet species</span>
                            <span className='appointment-line-info-values'>{petSpecies}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Pet gender</span>
                            <span className='appointment-line-info-values'>{petGender}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Date</span>
                            <span className='appointment-line-info-values'>{date}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Reason</span>
                            <span className='appointment-line-info-values'>{reason}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Additional Note</span>
                            <span className='appointment-line-info-values'>{additionalNote}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Status</span>
                            <span className='appointment-line-info-values'>{status}</span>
                        </div>
                        <div className='appointment-line'>
                            <span className='appointment-line-info'>Veterinary surgeon</span>
                            <span className='appointment-line-info-values'>{vet}</span>
                        </div>
                    </div>
                </div>


            </div>

        </AdminLayout>
    )
}

export default ViewAppointment