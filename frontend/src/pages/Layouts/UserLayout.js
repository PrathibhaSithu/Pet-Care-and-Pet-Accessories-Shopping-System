import React, { useState } from 'react'

import UserSidebar from '../../components/userSidebar/UserSidebar'
import Header from '../../components/store/Header/Header'
import './userLayout.scss'
import Footer from '../../components/store/Footer'

const AdminLayout = ({children}) => {

  return (
    <div>
        <Header />
        <div className='userDetailContainer'>
          <UserSidebar />
          <div className='userContent'>
          {
            children
          }
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default AdminLayout