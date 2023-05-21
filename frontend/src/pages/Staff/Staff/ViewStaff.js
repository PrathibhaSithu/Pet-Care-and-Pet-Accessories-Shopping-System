import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../Layouts/AdminLayout';
import { userRequest } from '../../../requestMethods'
import { toast } from 'react-hot-toast';

import './ViewStaff.scss'

function ViewStaff() {

    const { id } = useParams()

    const [firstName,setfirstName] = useState("")
    const [lastName,setlastName] = useState("")
    const [address,setaddress] = useState("")
    const [nic,setnic] = useState("")
    const [contactNo,setcontactNo] = useState("")
    const [dob,setdob] = useState("")
    const [email,setemail] = useState("")
    const [staffId,setstaffId] = useState("")
    const [department,setdepartment] = useState("")
    const [designation,setdesignation] = useState("")
    const [joinedDate,setjoinedDate] = useState("")
    const [salary,setsalary] = useState("")
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        userRequest.get('/staff/' + id)
        .then(res => {
            setfirstName(res.data.firstName)
            setlastName(res.data.lastName)
            setaddress(res.data.address)
            setnic(res.data.nic)
            setcontactNo(res.data.contactNo)
            setdob(res.data.dob)
            setemail(res.data.email)
            setstaffId(res.data.staffId)
            setdepartment(res.data.department)
            setdesignation(res.data.designation)
            setjoinedDate(res.data.joinedDate)
            setsalary(res.data.salary)
           
            setImageURL(res.data.simage)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])

    return (
        <AdminLayout>
            <div className='staff'>
                {/* <table>
                    <tr>
                        <td colSpan='2' className='imageContainer'>
                            <img src={imageURL} className='image' height='120px' />
                        </td>
                    </tr>
                    
                    <tr>
                        <td>First Name</td>
                        <td>{firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{lastName}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{address}</td>
                    </tr>
                    <tr>
                        <td>NIC</td>
                        <td>{nic}</td>
                    </tr>
                    <tr>
                        <td>Contact No</td>
                        <td>{contactNo}</td>
                    </tr>
                    <tr>
                        <td>Date of Birth</td>
                        <td>{dob}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td>Staff Id</td>
                        <td>{staffId}</td>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <td>{department}</td>
                    </tr>
                    <tr>
                        <td>Joined Date</td>
                        <td>{joinedDate}</td>
                    </tr>
                    <tr>
                        <td>Salary</td>
                        <td>{salary}</td>
                    </tr>
                    
                
                </table> */}


                <div className='staff-record-container'>
                    <div className = "staff-pic-container">
                        <img src={imageURL} className='staff-img'></img>
                    </div>
                    <div className = "staff-details-container">                     
                        <div className='staff-line'>
                            <span className='staff-line-info'>First Name</span>
                            <span className='staff-line-info-values'>{firstName}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Last Name</span>
                            <span className='staff-line-info-values'>{lastName}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Address</span>
                            <span className='staff-line-info-values'>{address}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>NIC</span>
                            <span className='staff-line-info-values'>{nic}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Contact No</span>
                            <span className='staff-line-info-values'>{contactNo}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Date of Birth</span>
                            <span className='staff-line-info-values'>{dob}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Email</span>
                            <span className='staff-line-info-values'>{email}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Staff Id</span>
                            <span className='staff-line-info-values'>{staffId}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Department</span>
                            <span className='staff-line-info-values'>{department}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Designation</span>
                            <span className='staff-line-info-values'>{designation}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Joined Date</span>
                            <span className='staff-line-info-values'>{joinedDate}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'>Salary</span>
                            <span className='staff-line-info-values'>{salary}</span>
                        </div>
                    </div> 
                </div>
            
            </div>
        </AdminLayout>
    )
}

export default ViewStaff