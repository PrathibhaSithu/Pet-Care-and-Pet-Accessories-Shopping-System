import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';

import './ViewPet.scss'

function ViewPet() {

    const { id } = useParams()
    const [petID, setPetID] = useState("")
    const [petName, setPetName] = useState("")
    const [age, setPetAge] = useState("")
    const [gender, setPetGender] = useState("")
    const [species, setPetSpecies] = useState("")
    const [breed, setPetBreed] = useState("")
    const [nic, setCustomerNIC] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [medicalHistory, setMedicalHistory] = useState("")
    const [imageURL, setImageURL] = useState('')
    
    useEffect(() => {
        userRequest.get('/pets/' + id)
        .then(res => {
            setPetID(res.data.petID)
            setPetName(res.data.petName)
            setPetAge(res.data.age)
            setPetGender(res.data.gender)
            setPetSpecies(res.data.species)
            setPetBreed(res.data.breed)
            setCustomerNIC(res.data.nic)
            setCustomerName(res.data.customerName)
            setContactNumber(res.data.contactNumber)
            setMedicalHistory(res.data.medicalHistory)
            setImageURL(res.data.picture)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])

    return (
        <AdminLayout>
             <div className='pet'>

                <div className='pet-record-container'>
                    <div className = "pet-pic-container">
                        <img src={imageURL} className='pet-img'></img>
                    </div>
                    <div className = "pet-details-container">                     
                        <div className='pet-line'>
                            <span className='pet-line-info'>Pet ID</span>
                            <span className='pet-line-info-values'>{petID}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>Pet Name</span>
                            <span className='pet-line-info-values'>{petName}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>Age</span>
                            <span className='pet-line-info-values'>{age}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>Gender</span>
                            <span className='pet-line-info-values'>{gender}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>Species</span>
                            <span className='pet-line-info-values'>{species}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>Breed</span>
                            <span className='pet-line-info-values'>{breed}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>NIC</span>
                            <span className='pet-line-info-values'>{nic}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>Customer Name</span>
                            <span className='pet-line-info-values'>{customerName}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>Contact Number</span>
                            <span className='pet-line-info-values'>{contactNumber}</span>
                        </div>
                        <div className='pet-line'>
                            <span className='pet-line-info'>Medical History</span>
                            <span className='pet-line-info-values'>{medicalHistory}</span>
                        </div>
                    </div> 
                </div>

            </div>
        </AdminLayout>
    )
}

export default ViewPet