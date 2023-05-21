import React from 'react'
import UnderDev from '../../../assets/imgs/error-displayers/under-development.png'
import './under-development.scss'

function UnderDevelopment() {
  return (
        <div className="main-under-dev-container">
            <img src={UnderDev} alt="" className="under-dev-picture" />
            <span className="under-dev-prompt">
                This feature is under development! will be available soon!
            </span>
        </div>
  )
}

export default UnderDevelopment