import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../Layouts/AdminLayout';
import { userRequest } from '../../../requestMethods'
import { toast } from 'react-hot-toast';

import './ViewVet.scss'

function ViewVet() {

    const { id } = useParams()

    const [vcslId , setVcsl] = useState("")
    const [vetName, setName] = useState("")
    const [telephone , setTelephone] = useState("")
    const [email, setEmail] = useState("")
    const [experience, setExperience] = useState("")
    const [qualification, setQualification] = useState("")
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        userRequest.get('/vets/' + id)
        .then(res => {
            setVcsl(res.data.vcslId)
            setName(res.data.vetName)
            setTelephone(res.data.telephone)
            setEmail(res.data.email)
            setExperience(res.data.experience)
            setQualification(res.data.qualification)
            setImageURL(res.data.profilePicture)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])

    return (
        <AdminLayout>
            <div className='vet'>
            {/* <table>
                <tr>
                    <td colSpan='2' className='imageContainer'>
                        <img src={imageURL} className='image' height='120px' />
                    </td>
                </tr>
                <tr>
                    <td>VCSL ID</td>
                    <td>{vcslId}</td>
                </tr>
                <tr>
                    <td>Vet Name</td>
                    <td>{vetName}</td>
                </tr>
                <tr>
                    <td>Telephone</td>
                    <td>{telephone}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td>Experience</td>
                    <td style={{whiteSpace: 'pre-wrap'}}>{experience}</td>
                </tr>
                <tr>
                    <td>Qualification</td>
                    <td>{qualification}</td>
                </tr>
            </table> */}

                <div className='vet-record-container'>
                    <div className = "vet-pic-container">
                        <img src={imageURL} className='vet-img'></img>
                    </div>
                    <div className = "vet-details-container">                     
                        <div className='vet-line'>
                            <span className='vet-line-info'>VCSL ID</span>
                            <span className='vet-line-info-values'>{vcslId}</span>
                        </div>
                        <div className='vet-line'>
                            <span className='vet-line-info'>Vet Name</span>
                            <span className='vet-line-info-values'>{vetName}</span>
                        </div>
                        <div className='vet-line'>
                            <span className='vet-line-info'>Telephone </span>
                            <span className='vet-line-info-values'>{telephone}</span>
                        </div>
                        <div className='vet-line'>
                            <span className='vet-line-info'>Email</span>
                            <span className='vet-line-info-values'>{email}</span>
                        </div>
                        <div className='vet-line'>
                            <div className='vet-line-info'>Experience </div>
                            <div className='vet-line-info-values'>{experience}</div>
                        </div>
                        <div className='vet-line'>
                            <div className='vet-line-info'>Qualification</div>
                            <div className='vet-line-info-values'>{qualification}</div>
                        </div>
                    </div> 
                </div>

            </div>
            
        </AdminLayout>
    )
}

export default ViewVet