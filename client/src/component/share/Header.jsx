import React from 'react'
import logo from '../../logo.png'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Header({params}) {
    const {currentUser} = useContext(AuthContext)
    const logout = async () => {
        try {
          await axios.post('/api/auth/logout')
          localStorage.removeItem("user");
          window.location.reload()
        } catch (error) {
          console.log(error)
        }
        
      }
      const nav= useNavigate()
    
    const handleClick = ()=> {
        if (params.includes('admin')){
            nav('/admin')
            
        }

        if (params.includes('student')){
          nav(`/student/${currentUser.id}`)
          
      }
    }
      
  return (
    <div>
      <img className='logo' src={logo} onClick={handleClick}></img>
      <nav>
          <ul>
            <li>Hi, {currentUser.username}</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </nav>
    </div>
  )
}

export default Header
