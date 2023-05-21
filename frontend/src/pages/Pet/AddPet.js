import React, { useEffect,useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout'
import './AddPet.scss'
import { userRequest } from '../../requestMethods'
import uploadImage from '../../uploadImage';
import { toast } from 'react-hot-toast';


function AddPet() {

  const [petID, setPetID] = useState("")
  const [petName, setPetName] = useState("")
  const [age, setPetAge] = useState("")
  const [gender, setPetGender] = useState("")
  const [species, setPetSpecies] = useState("")
  const [breed, setPetBreed] = useState("")
  const [nic, setCustomerNIC] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [file, setFile] = useState(null)
 
  const handleReset = () => {
        setPetID('')
        setPetName('')
        setPetAge('')
        setPetGender('')
        setPetSpecies('')
        setPetBreed('')
        setCustomerNIC('')
        setCustomerName('')
        setContactNumber('')
        setMedicalHistory('')
        setFile(null)
       
    // Clear the value of the file input field
    document.getElementById('file-input').value = '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    const imageURL = await uploadImage(file);
  
    userRequest.post("/pets", {petID, petName,age, gender,species, breed, nic, customerName,contactNumber,medicalHistory, picture : imageURL })
    .then(res => {
        toast.success('Pet added')
        handleReset()
    }).catch(err => {
        toast.error(err.message)
    })
  }  

  const [maxDate, setMaxDate] = useState(null)

  useEffect(() => {
    const date = new Date();
    setMaxDate(date.toISOString().split("T")[0])
  }, [])

  return (
    <AdminLayout>
      
    <div className="add-pet-container-main">
        {/* this is the form container */}
        <form className="add-pet-form-container" onSubmit={handleSubmit}>
            <span className="tagline-add-pet">Add Pet</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-pet-column">
                <section className="input-container"> 
                  <span className="input-title">Pet ID</span>
                  <input className="input-field" value={petID} required onChange={(e) => setPetID(e.target.value)}/>
                </section>
                <section className="input-container">
                  <span className="input-title">Pet Name</span>
                  <input className="input-field" value={petName} required onChange={(e) => setPetName(e.target.value)}/>
                </section>
                <section className="input-container">
                  <span className="input-title">Age</span>
                  <input className="input-field" type="number" id="ageNumber" name="ageNumber" min="1" max ="100" value={age} required onChange={(e) => setPetAge(e.target.value)}/>
                </section>
                <section className="input-container">
                  <span className="input-title">Gender</span>
                  <select className="input-field" value={gender} onChange={(e) => setPetGender(e.target.value)}>
                      <option className='select-option'>select</option>
                      <option className='select-option' >Male</option>
                      <option className='select-option' >Female</option>
                  </select>
                </section>

                <section className="input-container">
                  <span className="input-title">Species</span>
                  <select className="input-field" value={species} onChange={(e) => setPetSpecies(e.target.value)}>
                      <option className='select-option'>select</option>
                      <option className='select-option' >Dog</option>
                      <option className='select-option' >Cat</option>
                      <option className='select-option' >Bird</option>
                      <option className='select-option' >Rabbit</option>
                      <option className='select-option' >Guinea Pig</option>
                      <option className='select-option' >Hamster</option>
                      <option className='select-option' >Reptile</option>
                      <option className='select-option' >Fish</option>
                      
                  </select>
                  </section>
                <section className="input-container">
                  <span className="input-title ">breed</span>
                  <input className="input-field" value={breed} onChange={(e) => setPetBreed(e.target.value)}/>
                </section>
                
                {/* <section className="input-container">
                <span className="input-title">Gender</span>
                <div className='radio-btn-pet'>
                
                 <input
                    className='input-radiobtn'
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setPetGender(e.target.value)}
                />
               Male
              
              
              <input
                  className='input-radiobtn'
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setPetGender(e.target.value)}
              />
             Female
          
           </div>
          </section> */}
          {/* <section className="input-container">
  <span className="input-title">Gender</span>
  <div className="checkbox-container">
    <label className="checkbox-label">
      <input
        type="checkbox"
        className="checkbox-field"
        value="Male"
        checked={gender === "Male"}
        onChange={(e) => setPetGender(e.target.checked ? "Male" : "")}
      />
      Male
    </label>
    <label className="checkbox-label">
      <input
        type="checkbox"
        className="checkbox-field"
        value="Female"
        checked={gender === "Female"}
        onChange={(e) => setPetGender(e.target.checked ? "Female" : "")}
      />
      Female
    </label>
  </div>
</section> pattern="^([0-9]{9}[x|X|v|V]|[0-9]{12})$"*/}
              </div>
              
              {/* column two */}
               <div className="add-pet-column">
                   <section className="input-container">
                      <span className="input-title">NIC</span>
                      <input className="input-field"  value={nic} required onChange={(e) => setCustomerNIC(e.target.value)}/>
                    </section>
                    <section className="input-container">
                       <span className="input-title">customer Name</span>
                       <input className="input-field" value={customerName} required onChange={(e) => setCustomerName(e.target.value)}/>
                    </section>
                    <section className="input-container">
                       <span className="input-title">Contact Number</span>
                       <input className="input-field" type="tel" pattern="^\+94\d{9}$"  value={contactNumber} required onChange={(e) => setContactNumber(e.target.value)}/>
                    </section>
                    <section className="input-container">
                       <span className="input-title">Medical History</span>
                       <textarea className='input-textarea' id="" cols="30" rows="10" value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)}></textarea>
                    </section>
                    <section className="input-container">
                        <span className="input-title">Upload Image</span>
                        <input id="file-input" type="file" accept='.png, .jpeg, .jpg, .webp' className='input-field' required onChange={(e) => setFile(e.target.files[0])}/>
                    </section>
                    <div className="btn-container-add-pet">
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

export default AddPet