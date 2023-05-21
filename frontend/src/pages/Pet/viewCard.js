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
    const [file, setFile] = useState(null)
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
            <div className='product'>
            
            
            <table>
                
            
                <tr>
                
                    <td colSpan='2' className='imageContainer'>
                        <img src={imageURL} className='image' height='180px'/>
                           <a href="http://localhost:3000/admin/treatments/ViewTreatment/644581c398b5916921d430ad" class="button glow-button">Treatments</a>
                        
                    </td>
                </tr>

                <tr>
                    <td>Pet ID</td>
                    <td>{petID}</td>
                </tr>
                <tr>
                    <td>Pet Name</td>
                    <td>{petName}</td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>{age}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{gender}</td>
                </tr>
                <tr>
                    <td>Species</td>
                    <td>{species}</td>
                </tr>
                <tr>
                    <td>Breed</td>
                    <td>{breed}</td>
                </tr>
                <tr>
                    <td>NIC</td>
                    <td>{nic}</td>
                </tr>
                <tr>
                    <td>Customer Name</td>
                    <td>{customerName}</td>
                </tr>
                <tr>
                    <td>Contact Number</td>
                    <td>{contactNumber}</td>
                </tr>
                <tr>
                    <td>Medical History</td>
                    <td>{medicalHistory}</td>
                </tr>
                
                
            </table>
            
            </div>
        </AdminLayout>
    )
}

export default ViewPet