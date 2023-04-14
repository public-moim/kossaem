import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import Popup from './Popup'
import axios from 'axios'

function Signup() {
  const [pop, setPop] = useState(false)
  const params = useParams().type

  const [user, setUser] = useState({
    email: '',
    username: '',
    password:''
  })
  const [err, setError] = useState()
  
  
  
  const handleChange = (e) => {
    
    const field = e.target.name
    setUser(prevValue => ({
      ...prevValue,
      [field]: e.target.value,
        
    }))

    if (err) {
      setError('')
      
    }
    
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/register', user)
      

      if (response.data.detail) {
        const error = response.data.detail
        if (error.includes('email')){
          setError('email')
        } else if(error.includes('username')){
          setError('username')
        }
      } 

      if (response.data.isSuccess === 'ok') {
        setPop(true)
      }

      

      
      
    } catch (error) {
      console.log(error)
    }
  }

  const popUpHandler = (value) => {
    setPop(value)

  }
  return (
    <div className='landingContainer signup'>
      <div className="auth-box">
        <div className="subheader">Signup</div>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
          <input type="email" placeholder='Email' value={user.email} onChange={handleChange} name='email' required/>
            {err === 'email' ? 
            <p className='error'>Email already exist</p>
          :
          ""}
          </div>
            
            <div className="form-input">
            <input type="text" placeholder='Username' value={user.username} onChange={handleChange} name='username' required/>
            {err === 'username' ? 
            <p  className='error'>Username already exist</p>
          :
          ""}
            </div>
            
            <div className="form-input">
            <input type="password" placeholder='Password' value={user.password} onChange={handleChange} name='password' required/>
            </div>
            
            <button type="submit" className="button-primary" >Signup</button>
        </form>
        
        <div className="additional">
          <p>Already have account?  <Link to='/login'><span className='orange-text'>Login</span></Link></p>
          {params === 'teacher'
          ?
          <p> or <Link to='/signup/student'><span className='orange-text'>Sign up </span></Link>as student</p>
        :
        <p> or <Link to='/signup/teacher'><span className='orange-text'>Sign up </span></Link>as teacher</p>
}
          
        </div>
        </div>

      <Popup pop={pop} popUpHandler={popUpHandler}/>
    </div>
  )
}

export default Signup
