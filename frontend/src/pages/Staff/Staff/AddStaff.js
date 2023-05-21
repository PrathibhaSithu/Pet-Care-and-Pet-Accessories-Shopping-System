import React,{useEffect,useState} from 'react';
import AdminLayout from '../../Layouts/AdminLayout'
import './AddStaff.scss'
import { userRequest } from '../../../requestMethods'
import uploadImage from '../../../uploadImage';
import { toast } from 'react-hot-toast';

const AddStaff = () => {
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
  const [file, setFile] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imageURL = await uploadImage(file);
    userRequest.post("/staff",  {firstName, lastName, address, nic, contactNo, dob, email, department,designation, joinedDate, salary, simage: imageURL})
    .then(res => {
      toast.success('Staff added')
      handleReset()
  }).catch(err => {
      toast.error(err.message)
  })
  }

  const handleReset = () => {
    setfirstName('')
    setlastName('')
    setaddress('')
    setnic('')
    setcontactNo('')
    setdob('')
    setemail('')
   // setstaffId('')
    setdepartment('')
    setdesignation('')
    setjoinedDate('')
    setsalary('')
    setFile(null)

    document.getElementById('file-input').value = '';
  }
  const [maxDate, setMaxDate] = useState(null)

  useEffect(() => {
    const date = new Date();
    setMaxDate(date.toISOString().split("T")[0])
  }, [])
  

  return (
    <AdminLayout>
    <div className="add-staff-container-main">
        {/* this is the form container */}
        <form className="add-staff-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-staff"> Add Staff Member</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-staff-column">
                <section className="input-container">
                  <span className="input-title">First Name</span>
                  <input className="input-field" value={firstName} onChange={(e) => setfirstName(e.target.value)} pattern="[a-zA-Z]+" required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Address</span>
                  <input className="input-field" value={address} onChange={(e) => setaddress(e.target.value)} required/>
                </section>
                <section className="input-container">
                  <span className="input-title">Contact No</span>
                  <input className="input-field" type="tel" value={contactNo} onChange={(e) => setcontactNo(e.target.value)} pattern="07[1,2,5,6,7,8][0-9]{7}" maxlength="10" title="Add valid contact Num" required/>
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
                  <input className="input-field" value={salary} onChange={(e) => setsalary(e.target.value)} type="text" pattern="[0-9]*[.]?[0-9]{0,2}" title='Enter price with up to 2 decimals (e.g. 59.99)'required/>
                </section>
              </div>
              {/* column two */}
              <div className="add-staff-column">
                    <section className="input-container">
                        <span className="input-title">Last Name</span>
                        <input className="input-field" value={lastName} onChange={(e) => setlastName(e.target.value)} pattern="[a-zA-Z]+" required/>
                    </section>
                    <section className="input-container">
                        <span className="input-title">NIC</span>
                        <input className="input-field" value={nic} onChange={(e) => setnic(e.target.value)} required/>
                        {/* <input className="input-field" value={nic} onChange={(e) => setnic(e.target.value)} pattern="^([0-9]{9}[x|X|v|V]|[0-9]{12})$" required/> */}
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
                        <input id="file-input" type="file" accept='.png, .jpeg, .jpg, .webp' className='input-field' onChange={(e) => setFile(e.target.files[0])} required/>
                    </section>
                    <div className="btn-container-add-staff">
                      <button type='submit' className="submit-btn">Submit</button>
                      <button type='reset' className="reset-btn" onClick={handleReset}>Reset</button>
                    </div>
              </div>
            </div>
        </form>
    </div>
    </AdminLayout>
  )
}

export default AddStaff