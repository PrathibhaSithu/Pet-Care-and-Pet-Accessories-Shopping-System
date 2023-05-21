import React, { useState, useEffect } from 'react';
import AdminLayout from '../../Layouts/AdminLayout'
import './EditVet.scss'
import { userRequest } from '../../../requestMethods'
import uploadImage from '../../../uploadImage';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function EditVet() {

  const { id } = useParams()
  const navigate = useNavigate()


  const[vcslId , setVcsl] = useState("")
  const[vetName, setName] = useState("")
  const[telephone , setTelephone] = useState("")
  const[email, setEmail] = useState("")
  const[experience, setExperience] = useState("")
  const[qualification, setQualification] = useState("")
  const [file, setFile] = useState(null)
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


  const handleSubmit = async (e) => {
    e.preventDefault()

    if(file ){

      const URL = await uploadImage(file)

      userRequest.put("/vets/" + id, { vcslId, vetName, telephone, email, experience, qualification, profilePicture: URL })
      .then(res => {
          toast.success('Vet updated')
          navigate('/admin/vets/manageVet')
      }).catch(err => {
          toast.error(err.message)
      })

    }
    else {

      userRequest.put("/vets/" + id, { vcslId, vetName, telephone, email, experience, qualification, profilePicture: imageURL })
      .then(res => {
          toast.success('Vet updated')
          navigate('/admin/vets/manageVet')
      }).catch(err => {
          toast.error(err.message)
      })

    }
  }  


  return (
    <AdminLayout>
      <div className="edit-vet-container-main">
        {/* this is the form container */}
        <form className="edit-vet-form-container" onSubmit={handleSubmit}>
            <span className="tagline-edit-vet">Edit Vet</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="edit-vet-column">
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
                  <input type="tel" className="input-field" value={telephone} onChange={(e) => setTelephone(e.target.value)} pattern="[0-9]{10}" required />
                </section>
                <section className="input-container">
                  <span className="input-title">Email</span>
                  <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                </section>
              </div>
              {/* column two */}
              <div className="edit-vet-column">
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
                        <input type="file" id="file-input" className='input-field' accept='.png, .jpeg, .jpg, .webp'  onChange={(e) => setFile(e.target.files[0])} />
                    </section>

                    <div className="btn-container-edit-vet">
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

export default EditVet