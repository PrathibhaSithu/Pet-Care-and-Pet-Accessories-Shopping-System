import React, { useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout'
import './AddService.scss'
import { userRequest } from '../../requestMethods'
import uploadImage from '../../uploadImage';
import { toast } from 'react-hot-toast';

function AddService() {
  
  const [serviceId, setserviceId] = useState("")
  const [serviceName, setservicetName] = useState("")
  const [serviceCharge, setserviceCharge] = useState("")
  const [serviceDescription, setserviceDescription] = useState("")
  const [file, setFile] = useState(null)
 
  const handleReset = () => {

    setserviceId('')
    setservicetName('')
    setserviceCharge('')
    setserviceDescription('')
    setFile(null)
    
    document.getElementById('file-input').value = '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const imageURL = await uploadImage(file);
    userRequest.post("/services", { serviceId, serviceName, serviceCharge, serviceDescription, serviceImage: imageURL })
    .then(res => {
        toast.success('Service added')
        handleReset()
    }).catch(err => {
        toast.error(err.message)
    })

    // console.log({ serviceId,serviceName,serviceCharge,serviceDescription,serviceImage: imageURL });
  }  


  return (
    <AdminLayout>

      <div className="add-service-container-main">
        {/* this is the form container */}
        <form className="add-service-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-service">Add Service</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-service-column">

                <section className="input-container">
                  <span className="input-title">Service ID</span>
                  <input type='text' className="input-field" value={serviceId} onChange={(e) => setserviceId(e.target.value)} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Service Name</span>
                  <input className="input-field" value={serviceName} onChange={(e) => setservicetName(e.target.value)} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Service Description</span>
                  <textarea className='input-textarea' id="" cols="30" rows="10" value={serviceDescription} onChange={(e) => setserviceDescription(e.target.value)} required></textarea>
                </section>

                <section className="input-container">
                  <span className="input-title">Service Charge</span>
                  <input type='text' pattern="[0-9]*[.]?[0-9]{0,2}" title='Enter price with up to 2 decimals (e.g. 59.99)' className="input-field" value={serviceCharge} onChange={(e) => setserviceCharge(e.target.value)} required/>
                </section>

                <section className="input-container">
                  <span className="input-title">Service image</span>
                  <input id="file-input" type="file" accept='.png, .jpeg, .jpg, .webp' className='input-field' onChange={(e) => setFile(e.target.files[0])}/>
                </section>


                <div className="btn-container-add-service">
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

export default AddService