import React, { useState, useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout'
import './EditStaff.scss'
import { userRequest } from '../../../requestMethods'
import uploadImage from '../../../uploadImage';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function EditStaff() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [firstName,setfirstName] = useState("")
  const [lastName,setlastName] = useState("")
  const [address,setaddress] = useState("")
  const [nic,setnic] = useState("")
  const [contactNo,setcontactNo] = useState("")
  const [dob,setdob] = useState("")
  const [email,setemail] = useState("")
  // const [staffId,setstaffId] = useState("")
  const [department,setdepartment] = useState("")
  const [designation,setdesignation] = useState("")
  const [joinedDate,setjoinedDate] = useState("")
  const [salary,setsalary] = useState("")
  const [simage,setsimage] = useState(null)
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
      // setstaffId(res.data.staffId)
      setdepartment(res.data.department)
      setdesignation(res.data.designation)
      setjoinedDate(res.data.joinedDate)
      setsalary(res.data.salary)
      setImageURL(res.data.image)
    }).catch(err =>{
        toast.error(err.message)
    })
  }, [id])


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(simage ){
      const URL = await uploadImage(simage)
      userRequest.put("/staff/" + id, { firstName, lastName, address, nic, contactNo, dob, email, department, designation, joinedDate, salary, simage : URL })
      .then(res => {
          toast.success('Staff Deatils updated')
          navigate('/admin/staff/ManageStaff')
      }).catch(err => {
          toast.error(err.message)
      })
    }
    else {
      userRequest.put("/staff/" + id, {firstName, lastName, address, nic, contactNo, dob, email, department, designation, joinedDate, salary, simage : imageURL })
      .then(res => {
          toast.success('Staff Deatils updated')
          navigate('/admin/staff/ManageStaff')
      }).catch(err => {
          toast.error(err.message)
      })
    }
  }  
  const [maxDate, setMaxDate] = useState(null)

  useEffect(() => {
    const date = new Date();
    setMaxDate(date.toISOString().split("T")[0])
  }, [])

  return (
    <AdminLayout>
      <div className="edit-staff-container-main">
        {/* this is the form container */}
        <form className="edit-staff-form-container" onSubmit={handleSubmit}>
            <span className="tagline-edit-staff">Edit staff details</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="edit-staff-column">

                <section className="input-container">
                  <span className="input-title"> First Name</span>
                  <input type='text' className="input-field" value={firstName} onChange={(e) => setfirstName(e.target.value)} pattern="[a-zA-Z]+" required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Address</span>
                  <input className="input-field" value={address} onChange={(e) => setaddress(e.target.value)} required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Contact No</span>
                  <input className="input-field" type="tel" value={contactNo} onChange={(e) => setcontactNo(e.target.value)} title="Add valid contact Num" required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Email</span>
                  <input className="input-field" value={email} onChange={(e) => setemail(e.target.value)} type="email" title="Add valid email eg:- johndoe@gmail.com" required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Department</span>
                  <input className="input-field" value={department} onChange={(e) => setdepartment(e.target.value)} required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Salary</span>
                  <input className="input-field" value={salary}  onChange={(e) => setsalary(e.target.value)} type="text" pattern="[0-9]*[.]?[0-9]{0,2}"  title='Enter price with up to 2 decimals (e.g. 59.99)'required/>
                </section>

                {/* <section className="input-container">
                  <span className="input-title">Price</span>
                  <input type='text' pattern="[0-9]*[.]?[0-9]{0,2}" title='Enter price with up to 2 decimals (e.g. 59.99)' className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                </section> */}

                

              </div>

              {/* column two */}
              <div className="edit-staff-column">
              <section className="input-container">
                        <span className="input-title">Last Name</span>
                        <input className="input-field" value={lastName} onChange={(e) => setlastName(e.target.value)} pattern="[a-zA-Z]+" required/>
                    </section>
                    <section className="input-container">
                        <span className="input-title">NIC</span>
                        <input className="input-field" value={nic} onChange={(e) => setnic(e.target.value)} pattern="^([0-9]{9}[x|X|v|V]|[0-9]{12})$" required/>
                    </section>
                    <section className="input-container">
                        <span className="input-title">Date Of Birth</span>
                        <input className="input-field" value={dob} onChange={(e) => setdob(e.target.value)} type="date" max={maxDate} required/>
                    </section>
                    {/* <section className="input-container">
                        <span className="input-title">Staff ID</span>
                        <input className="input-field" value={staffId} onChange={(e) => setstaffId(e.target.value)} required/>
                    </section> */}
                    <section className="input-container">
                        <span className="input-title">Joined Date</span>
                        <input className="input-field" value={joinedDate} onChange={(e) => setjoinedDate(e.target.value)} type="date" max={maxDate} required/>
                    </section>
                    <section className="input-container">
                        <span className="input-title">Designation</span>
                        <input className="input-field" value={designation} onChange={(e) => setdesignation(e.target.value)} required/>
                    </section>
                    <section className="input-container">
                        <span className="input-title">Staff Member Image</span>
                        <input id="file-input" type="file" accept='.png, .jpeg, .jpg, .webp' className='input-field' onChange={(e) => setsimage(e.target.files[0])} />
                    </section>

                    <div className="btn-container-edit-staff">
                      <button type='submit' className="submit-btn">Update</button>
                      <button type='reset' className="reset-btn">Reset</button>
                    </div>

              </div>
            </div>
        </form>
    </div>
    </AdminLayout>

  )
}

export default EditStaff