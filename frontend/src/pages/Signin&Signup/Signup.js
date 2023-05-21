import React , {useContext, useState} from 'react'
import {FcGoogle} from 'react-icons/fc'
import { publicRequest } from '../../requestMethods'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function Signup() {

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserContext)

  // set this state variable true if you want to display the error
  const[errorState , setErrorState] = useState(false)

  // password validator
  const [passwordValidator , setPasswordValidator] =useState({
      username:"",
      email:"",
      password:"",
      repassword:""
  })

  const signUpFieldHandler = (e) => {
    setPasswordValidator({...passwordValidator , [e.target.name]:e.target.value})
  }

  const signupSubmitHandler = (e) => {
    e.preventDefault()

    if(passwordValidator.password !== passwordValidator.repassword){
      setErrorState(true)
    }
    else{
      setErrorState(false)

      publicRequest.post("/users", { username: passwordValidator.username, email: passwordValidator.email, password: passwordValidator.password })
      .then(res => {
          if(res.status === 201) {
            setUser(res.data)
            // toast.success('Registration successfull')
            navigate('/')
          }
      }).catch(err => {
          toast.error(err.response.data.message)
      })
    }
  }

  return (
    <div className="signin-signup-cpt-frame">
        <form onSubmit={signupSubmitHandler}>
              {/* username container */}
              <div className="input-container-signin-signup">
                <span className="signin-signup-label">Username*</span>
                <input type="text" pattern="^[A-Za-z][A-Za-z ]{2,14}[A-Za-z ]$" title="Username must start with a letter, can only contain letters and spaces, and be 4 to 16 characters long" className="signin-signup-input-field" placeholder='Enter your username' name='username' value={passwordValidator.username} onChange={signUpFieldHandler} required/>
              </div>
              {/* email container */}
              <div className="input-container-signin-signup">
                <span className="signin-signup-label">Email*</span>
                <input type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Please enter a valid email address" className="signin-signup-input-field" placeholder='Enter your email' name='email' value={passwordValidator.email} onChange={signUpFieldHandler} required/>
              </div>
               {/* password container */}
              <div className="input-container-signin-signup">
                <span className="signin-signup-label">Password*</span>
                <input type="password" pattern="^[a-zA-Z0-9]{8,}$" title="Password must contain at least 8 characters, consisting of letters and digits" className="signin-signup-input-field" placeholder='Enter your password' name='password' value={passwordValidator.password} onChange={signUpFieldHandler} required/>
              </div>
               {/* confirm password container */}
              <div className="input-container-signin-signup">
                <span className="signin-signup-label">Re-enter Password*</span>
                <input type="password" className="signin-signup-input-field" placeholder='Re-enter the password' name='repassword' value={passwordValidator.repassword} onChange={signUpFieldHandler} required/>
              </div>
              {/* error message */}
              <span className={errorState ? `error-state-signin` : `error-state-signin hide`}>
               Passwords are not matching!
              </span>
              <button type='submit' className="signin-signup-btn">Sign up</button>
        </form>
    </div>
  )
}

export default Signup