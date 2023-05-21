import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout'
import './AddPrescription.scss'
import { userRequest } from '../../../requestMethods'
import { toast } from 'react-hot-toast';
import useEffect  from 'react';
import axios from 'axios';

function AddPrescription() {

 // const [data, setData] = useState([]);
 // const [name, setName] = useState('');
  //const [age, setAge] = useState('');

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const result = await axios('/api/data');
  //   setData(result.data);
  // };

  // const addData = async () => {
  //   const newData = { name, age: parseInt(age) };
  //   await axios.post('/api/data', newData);
  //   fetchData();
  // };


  const[petname , setPetName] = useState("")
  const[address, setAddress] = useState("")
  const[description , setDescription] = useState("")
  const[medicine, setMedicine] = useState("")
  const[dosage, setDosage] = useState("")

  const handleReset = () => {
      setPetName('')
      setAddress('')
      setDescription('')
      setMedicine('')
      setDosage('')
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    userRequest.post("/prescriptions", { petname, address, description, medicine, dosage })
    .then(res => {
        toast.success('Prescription added')
        handleReset()
    }).catch(err => {
        toast.error(err.message)
    })
  }  


  return (
    <AdminLayout>
     <div className="add-prescription-container-main">
        {/* this is the form container */}
        <form className="add-prescription-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-prescription">Add New Prescription</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-prescription-column">
                <section className="input-container">
                  <span className="input-title">pet name</span>
                  <input type="text" className="input-field" value={petname} onChange={(e) => setPetName(e.target.value)} required />
                </section>
                <section className="input-container">
                  <span className="input-title">address</span>
                  <input type="text" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </section>
                <section className="input-container">
                  <span className="input-title">description</span>
                  <textarea type="text" className='input-textarea' id="" cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                </section>

                <section className="input-container">
                  <span className="input-title">medicine</span>
                  <input type="text" className="input-field" value={medicine} onChange={(e) => setMedicine(e.target.value)} required />
                </section>
                <section className="input-container">
                  <span className="input-title">dosage</span>
                  <input type="text" className="input-field" value={dosage} onChange={(e) => setDosage(e.target.value)} required />
                </section>

                <div className="btn-container-add-prescription">
                  <button type='submit' className="submit-btn">Submit</button>
                  <button type='reset' className="reset-btn">Reset</button>
                </div>

              </div>
              {/* column two */}
            
            </div>
        </form>
    </div>
    </AdminLayout>

  )
}

export default AddPrescription