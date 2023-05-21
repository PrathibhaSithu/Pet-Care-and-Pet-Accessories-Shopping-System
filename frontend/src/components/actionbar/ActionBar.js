import React from 'react'

import './actionbar.scss'

const ActionBar = () => {
  return (
    <div className="main-ribbon">
        <div className="inventory-management-text">
            Main Dashboard
        </div>

        <div className="user-details">
          <img className='user-image' src='https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg' alt="profile" />
          <div className="profile-details">
              <span className='username'>Nimal</span>
              <span className='designation'>Inventory Manager</span>
          </div>
        </div>
    </div>
  )
}

export default ActionBar