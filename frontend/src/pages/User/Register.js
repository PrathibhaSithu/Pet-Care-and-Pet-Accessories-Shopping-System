import React, { useState } from 'react'
import { publicRequest } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';


function Register() {
    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    publicRequest.post('/users/login', {email, password})
    .then(res => {
      console.log(res.data)
      navigate('/store')
    })
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button>Login</button>
            
        </form>
    </div>
  )
}

export default Register