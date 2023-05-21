import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';

import './ViewService.scss'

function ViewService() {

    const { id } = useParams()

    const [serviceId, setserviceId] = useState('')
    const [serviceName, setservicetName] = useState('')
    const [serviceCharge, setserviceCharge] = useState('')
    const [serviceDescription, setserviceDescription] = useState('')
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        userRequest.get('/services/' + id)
        .then(res => {
            
            setserviceId(res.data.serviceId)
            setservicetName(res.data.serviceName)
            setserviceCharge(res.data.serviceCharge)
            setserviceDescription(res.data.serviceDescription)
            setImageURL(res.data.serviceImage)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])

    return (
        <AdminLayout>
            <div className='service'>
                {/* <table>
                    <tr>
                        <td colSpan='2' className='imageContainer'>
                            <img src={imageURL} className='image' height='120px' />
                        </td>
                    </tr>
                    <tr>
                        <td>Service ID</td>
                        <td>{serviceId}</td>
                    </tr>
                    <tr>
                        <td>Service Name</td>
                        <td>{serviceName}</td>
                    </tr>
                    <tr>
                        <td>Service Charge</td>
                        <td>{serviceCharge}</td>
                    </tr>
                    <tr>
                        <td>Service Description</td>
                        <td style={{whiteSpace: 'pre-wrap'}}>{serviceDescription}</td>
                    </tr>
                    
                </table> */}
                
                <div className='service-record-container'>
                    <div className = "service-pic-container">
                        <img src={imageURL} className='service-img'></img>
                    </div>
                    <div className = "service-details-container">                     
                        <div className='service-line'>
                            <span className='service-line-info'>Service ID</span>
                            <span className='service-line-info-values'>{serviceId}</span>
                        </div>
                        <div className='service-line'>
                            <span className='service-line-info'>Service Name</span>
                            <span className='service-line-info-values'>{serviceName}</span>
                        </div>
                        <div className='service-line'>
                            <span className='service-line-info'>Service Charge</span>
                            <span className='service-line-info-values'>{serviceCharge}</span>
                        </div>
                        <div className='service-line'>
                            <span className='service-line-info'>Service Description</span>
                            <span className='service-line-info-values'>{serviceDescription}</span>
                        </div>
                    </div> 
                </div>

            </div>
        </AdminLayout>
    )
}

export default ViewService