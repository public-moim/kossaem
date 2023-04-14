import React, { useContext, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

function Login() {
  const [input,setInput] = useState({
    username:'student-demo',
    password:'student-demo'
  })
  const [err, setError] = useState()
  const {login,currentUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange =(e) => {
    const field = e.target.name

    setInput(prevValue => ({
      ...prevValue,
      [field]: e.target.value
    }))

    if (err) {
      setError('')
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const log =  await login(input)

      if (log === 'username'){
         return setError('username')
      } else if(log === 'password'){
        return setError('password')
      } 

      
      // console.log(JSON.parse(localStorage.getItem('user')).id)
      // navigate(`/student/${JSON.parse(localStorage.getItem('user')).id}`)
      // navigate('/login');
      
      
     // console.log(currentUser)

     
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='landingContainer login'>
      <div className="auth-box">
        <div className="subheader">Login</div>
        <form onSubmit={handleSubmit}>
            <div className="form-input">
            <input type="text" placeholder='Username' name='username' onChange={handleChange} required value={input.username}/>
                {err === 'username' ? 
                <p className='error'>User does not exist</p>
              :
              ""}
              </div>

              <div className="form-input">
            <input type="password" placeholder='Password' name='password' onChange={handleChange} required value={input.password}/>
                {err === 'password' ? 
                <p className='error'>Password does not match</p>
              :
              ""}
              </div>
            
            
            <button type="submit" className="button-primary" >Login</button>
        </form>
        
        <p>Don't have account yet? <Link to='/signup/student'><span className='orange-text'>Sign up</span></Link></p>
      </div>
    </div>
  )
}

export default Login
