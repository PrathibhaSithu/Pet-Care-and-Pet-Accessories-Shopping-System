import React from 'react'
import './addItem.scss'

import AdminLayout from '../Layouts/AdminLayout'

const AddItem = () => {
  return (
    <AdminLayout>
    <div className="add-item-container-main">
        {/* this is the form container */}
        <form className="add-item-form-container" onSubmit="">
            <span className="tagline-add-item">Fill the form for add item</span>
            {/* input field container */}
            <div className="column-container">
              {/* column one */}
              <div className="add-item-column">
                <section className="input-container">
                  <span className="input-title">item name</span>
                  <input className="input-field"/>
                </section>
                <section className="input-container">
                  <span className="input-title">store keeping unit (SKU)</span>
                  <input className="input-field"/>
                </section>
                <section className="input-container">
                  <span className="input-title">category</span>
                  <select className="input-field">
                      <option className='select-option' value="clinical-item">Clinical Item</option>
                      <option className='select-option' value="store-item">Pet Store Item</option>
                  </select> 
                </section>
                <section className="input-container">
                  <span className="input-title">unit price</span>
                  <input className="input-field"/>
                </section>
                <section className="input-container">
                  <span className="input-title">rack number</span>
                  <input className="input-field"/>
                </section>
              </div>
              {/* column two */}
              <div className="add-item-column">
                    <section className="input-container">
                        <span className="input-title">quantity</span>
                        <input className="input-field"/>
                    </section>
                    <section className="input-container">
                        <span className="input-title">manufacturer</span>
                        <input className="input-field"/>
                    </section>
                    <section className="input-container">
                        <span className="input-title">product description</span>
                        <textarea className='input-textarea' id="" cols="30" rows="10"></textarea>
                    </section>
                    <section className="input-container">
                        <span className="input-title">product image</span>
                        <input type="file" name="" id="" className='input-field'/>
                    </section>
                    <div className="btn-container-add-item">
                      <button type='submit' className="submit-btn">Submit</button>
                      <button type='reset' className="reset-btn">Reset</button>
                    </div>
              </div>
            </div>
        </form>
    </div>
    </AdminLayout>
  )
}

export default AddItem