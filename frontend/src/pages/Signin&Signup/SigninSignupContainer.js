import React from 'react'
import './SigninSignupStyles.scss'
import Signin from './Signin'
import Signup from './Signup'
function SigninSignupContainer(props) {

  const {trackState} = props

  return (
    <div className="signin-signup-container-main">
        {trackState ? <Signin/> : <Signup/>}
    </div>
  )
}

export default SigninSignupContainer