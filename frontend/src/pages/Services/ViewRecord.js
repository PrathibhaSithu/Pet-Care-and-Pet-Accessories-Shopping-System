import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';

import './ViewRecord.scss'

function ViewRecord() {

    const { id } = useParams()

    //const [recordId, setrecordId] = useState('')
    const [serviceName, setserviceName] = useState("")
  const [customerName, setcustomerName] = useState("")
  const [vetName, setvetName] = useState("")
  const [petType, setpetType] = useState("")
  const [date, setdate] = useState("")
  const [serviceCharge, setserviceCharge] = useState('')

    useEffect(() => {
        userRequest.get('/servicerecords/' + id)
        .then(res => {
            
            //setrecordId(res.data.recordId)
            setserviceName(res.data.serviceName)
            setcustomerName(res.data.customerName)
            setvetName(res.data.vetName)
            setpetType(res.data.petType)
            setdate(res.data.date)
            setserviceCharge(res.data.serviceCharge)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])

    return (
        <AdminLayout>
            <div className='serviceRecord'>
                
                {/* <table>
                    <tr>
                        <td>Service ID</td>
                        <td>{serviceId}</td>
                    </tr>
                    <tr>
                        <td>Customer ID</td>
                        <td>{customerId}</td>
                    </tr>
                    <tr>
                        <td>VCSL ID</td>
                        <td>{vcslId}</td>
                    </tr>
                    <tr>
                        <td>Pet ID</td>
                        <td>{petId}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td>Service Charge</td>
                        <td>{serviceCharge}</td>
                    </tr>
                </table> */}


                <div className='serviceRecord-record-container'>
                    <div className = "serviceRecord-details-container">    
                        <div className='serviceRecord-line'>
                            <span className='serviceRecord-line-info'>Service Name</span>
                            <span className='serviceRecord-line-info-values'>{serviceName}</span>
                        </div>                 
                        <div className='serviceRecord-line'>
                            <span className='serviceRecord-line-info'>Customer Name</span>
                            <span className='serviceRecord-line-info-values'>{customerName}</span>
                        </div>
                        <div className='serviceRecord-line'>
                            <span className='serviceRecord-line-info'>Vet Name</span>
                            <span className='serviceRecord-line-info-values'>{vetName}</span>
                        </div>
                        <div className='serviceRecord-line'>
                            <span className='serviceRecord-line-info'>Pet Type</span>
                            <span className='serviceRecord-line-info-values'>{petType}</span>
                        </div>
                        <div className='serviceRecord-line'>
                            <span className='serviceRecord-line-info'>Date</span>
                            <span className='serviceRecord-line-info-values'>{date}</span>
                        </div>
                        <div className='serviceRecord-line'>
                            <span className='serviceRecord-line-info'>Service Charge</span>
                            <span className='serviceRecord-line-info-values'>{serviceCharge}</span>
                        </div>
                    </div> 
                </div>
            </div>
        </AdminLayout>
    )
}

export default ViewRecord