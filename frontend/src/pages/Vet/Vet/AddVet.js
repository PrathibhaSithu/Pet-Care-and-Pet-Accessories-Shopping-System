import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout'
import './Addvet.scss'
import { userRequest } from '../../../requestMethods'
import uploadImage from '../../../uploadImage';
import { toast } from 'react-hot-toast';

function AddVet() {

  const[vcslId , setVcsl] = useState("")
  const[vetName, setName] = useState("")
  const[telephone , setTelephone] = useState("")
  const[email, setEmail] = useState("")
  const[experience, setExperience] = useState("")
  const[qualification, setQualification] = useState("")
  const [file, setFile] = useState(null)

  const handleReset = () => {
    setVcsl('')
        setName('')
        setTelephone('')
        setEmail('')
        setExperience('')
        setQualification('')
        setFile(null)
    // Clear the value of the file input field
    document.getElementById('file-input').value = '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    const imageURL = await uploadImage(file);
    userRequest.post("/vets", { vcslId, vetName, telephone, email, experience, qualification, profilePicture: imageURL })
    .then(res => {
        toast.success('Vet added')
        handleReset()
    }).catch(err => {
        toast.error(err.message)
    })
  }  


  return (
    <AdminLayout>
     <div className="add-vet-container-main">
        {/* this is the form container */}
        <form className="add-vet-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-vet">Add New Veterinary Surgeon</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-vet-column">
                <section className="input-container">
                  <span className="input-title">VCSL ID</span>
                  <input type="text" className="input-field" value={vcslId} onChange={(e) => setVcsl(e.target.value)} required />
                </section>
                <section className="input-container">
                  <span className="input-title">Veterinary surgeon name</span>
                  <input type="text" className="input-field" value={vetName} onChange={(e) => setName(e.target.value)} required />
                </section>
                <section className="input-container">
                  <span className="input-title">Telephone</span>
                  <input type="tel" className="input-field" value={telephone} onChange={(e) => setTelephone(e.target.value)} pattern="[0-9]{10}" placeholder="0123456789" required />
                </section>
                <section className="input-container">
                  <span className="input-title">Email</span>
                  <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
                </section>
              </div>
              {/* column two */}
              <div className="add-vet-column">
                     <section className="input-container">
                        <span className="input-title">Experience</span>
                        <textarea type="text" className='input-textarea' id="" cols="30" rows="10" value={experience} onChange={(e) => setExperience(e.target.value)} required ></textarea>
                    </section>
                    <section className="input-container">
                        <span className="input-title">Qualification</span>
                        <textarea type="text" className='input-textarea' id="" cols="30" rows="10" value={qualification} onChange={(e) => setQualification(e.target.value)} required ></textarea>
                    </section>
                    <section className="input-container">
                        <span className="input-title">Profile picture</span>
                        <input type="file" id="file-input" className='input-field' accept='.png, .jpeg, .jpg, .webp'  onChange={(e) => setFile(e.target.files[0])} required/>
                    </section>
                    <div className="btn-container-add-vet">
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

export default AddVet