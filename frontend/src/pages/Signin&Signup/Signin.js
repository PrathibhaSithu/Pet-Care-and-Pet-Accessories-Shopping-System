import React, { useContext, useState } from 'react'
import { publicRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './SigninSignupStyles.scss'

function Signin() {

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // set this state variable true if you want to display the error
  const[errorState , setErrorState] = useState(false)

  const signinSubmitHandler = (e) => {
    e.preventDefault()

    publicRequest.post("/users/login", { email, password })
    .then(res => {
        if(res.status === 200) {
          setErrorState(false)
          setUser(res.data)
          if(res.data.isAdmin === true)
            navigate('/admin/products/insights')
          else
            navigate('/')
        }
    }).catch(err => {
        setErrorState(true)
        // toast.error(err.response.data.message)
    })
  }

  return (
    <div className="signin-signup-cpt-frame">
        <form onSubmit={signinSubmitHandler}>
              {/* email container */}
              <div className="input-container-signin-signup">
                <span className="signin-signup-label">Email*</span>
                <input type="email" className="signin-signup-input-field" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              {/* password container */}
              <div className="input-container-signin-signup">
                <span className="signin-signup-label">Password*</span>
                <input type="password" className="signin-signup-input-field" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {/* error message */}
              <span className={errorState ? `error-state-signin` : `error-state-signin hide`}>
               Incorrect email or password!
              </span>
              <button type='submit' className="signin-signup-btn">Sign in</button>
        </form>
    </div>
  )
}

export default Signin