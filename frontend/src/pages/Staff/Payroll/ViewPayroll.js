import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../Layouts/AdminLayout';
import { userRequest } from '../../../requestMethods'
import { toast } from 'react-hot-toast';

import './ViewPayroll.scss'

function ViewPayroll() {

    const { id } = useParams()

    const[staffId,setstaffId] =  useState("")
    const[otHours,setotHours] =  useState("")
    const[salary,setsalary] =  useState("")
    const[paymentStatus,setpaymentStatus] =  useState("")
    const[date,setdate] =  useState("")


    useEffect(() => {
        userRequest.get('/payroll/' + id)
        .then(res => {
            setstaffId(res.data.staffId)
            setotHours(res.data.otHours)
            setsalary(res.data.salary)
            setpaymentStatus(res.data.paymentStatus)
            setdate(res.data.date)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])

    return (
        <AdminLayout>
            <div className='payroll'>
                {/* <h2>Payroll Details</h2> */}
                {/* <table>
                
                
                    <tr>
                        <td>Staff Id</td>
                        <td>{staffId}</td>
                    </tr>
                    <tr>
                        <td>OT Hours</td>
                        <td>{otHours}</td>
                    </tr>
                    <tr>
                        <td>Salary</td>
                        <td>{salary}</td>
                    </tr>
                    <tr>
                        <td>Payment Status</td>
                        <td>{paymentStatus}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{date}</td>
                    </tr>
                    
                    
                
                </table> */}

                <div className='payroll-record-container'>
                    <div className = "payroll-details-container">                     
                        <div className='payroll-line'>
                            <span className='payroll-line-info'>Staff ID</span>
                            <span className='payroll-line-info-values'>{staffId}</span>
                        </div>
                        <div className='payroll-line'>
                            <span className='payroll-line-info'>OT Hours</span>
                            <span className='payroll-line-info-values'>{otHours}</span>
                        </div>
                        <div className='payroll-line'>
                            <span className='payroll-line-info'>Salary</span>
                            <span className='payroll-line-info-values'>{salary}</span>
                        </div>
                        <div className='payroll-line'>
                            <span className='payroll-line-info'>Payment Service</span>
                            <span className='payroll-line-info-values'>{paymentStatus}</span>
                        </div>
                        <div className='payroll-line'>
                            <span className='payroll-line-info'>Date</span>
                            <span className='payroll-line-info-values'>{date}</span>
                        </div>
                    </div> 
                </div>

            </div>
        </AdminLayout>
    )
}

export default ViewPayroll