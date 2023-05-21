import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import { userRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';

import './ViewTreatment.scss'

function ViewTreatment() {

    const { id } = useParams()
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

    return (
        <AdminLayout>
            <div className='treatment'>
                {/* <table>
                    <tr>
                        <td>Pet ID</td>
                        <td>{petID}</td>
                    </tr>
                    <tr>
                        <td>Pet Name</td>
                        <td>{petName}</td>
                    </tr>
                    <tr>
                        <td>Customer ID</td>
                        <td>{customerID}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td>Treatment</td>
                        <td>{treatment}</td>
                    </tr>
                    <tr>
                        <td>Progress Notes</td>
                        <td>{progressNotes}</td>
                    </tr>
                    
                </table>
                </div> */} 

                <div className='treatment-record-container'>
                    <div className = "treatment-details-container">                     
                        <div className='treatment-line'>
                            <span className='treatment-line-info'>Pet ID</span>
                            <span className='treatment-line-info-values'>{petID}</span>
                        </div>
                        <div className='treatment-line'>
                            <span className='treatment-line-info'>Pet Name</span>
                            <span className='treatment-line-info-values'>{petName}</span>
                        </div>
                        <div className='treatment-line'>
                            <span className='treatment-line-info'>NIC</span>
                            <span className='treatment-line-info-values'>{nic}</span>
                        </div>
                        <div className='treatment-line'>
                            <span className='treatment-line-info'>Date</span>
                            <span className='treatment-line-info-values'>{date}</span>
                        </div>
                        <div className='treatment-line'>
                            <span className='treatment-line-info'>Treatment</span>
                            <span className='treatment-line-info-values'>{treatment}</span>
                        </div>
                        <div className='treatment-line'>
                            <span className='treatment-line-info'>Progress Notes</span>
                            <span className='treatment-line-info-values'>{progressNotes}</span>
                        </div>
                    </div> 
                </div>


            </div>
      
        </AdminLayout>
    )
}

export default ViewTreatment