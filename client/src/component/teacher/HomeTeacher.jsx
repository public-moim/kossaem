import React, {useContext, useState} from 'react'
import bg from '../student/bg-2.png'
import {  IoIosSettings } from "react-icons/io";
import Notification from './Notification'
import Dashboard from './Dashboard'
import ChatPageT from './ChatPageT';
import logo from '../../logo.png'
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiOutlineNotification } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './teacher.css'
import { AuthContext } from '../../context/authContext';
import axios from 'axios'
function HomeTeacher() {
    const [active, setActive] = useState(0)
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

  return (
    <div className='studentContainer teacher'>
        <nav>
        <img className='logo' src={logo} onClick={()=> setActive(0)}></img>
          <ul>
            
            <li onClick={()=> setActive(0)}>Hi, {currentUser.username}</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </nav>

        <div className="main" style={{ backgroundImage: `url(${bg})` }}>
          <div className="sideMenu">
          <div className="profiles">
            <div className="profPict"></div>
            <div className="profile">
              <p className="username">{currentUser.username}-nim</p>
              <p className="point">1,000P</p>
            </div>
            <div className="icon"><IoIosSettings/></div>
          </div>

          <div className="menu">
            <div className={active === 1 ? "item active": "item"} onClick={()=>setActive(1)}><span className='icon'><BsFillChatDotsFill/></span>
            New Request</div>

            <Link className='link' to='/teacher/chat'><div className={active ===2? "item active": "item"} onClick={()=>setActive(2)}><span className='icon'><AiOutlineNotification/></span>
            Practice Room</div></Link>

            


          </div>
          </div>

          <div className="body">
          {active === 1 
            ?
            <div className="bodyTitle">
            New Request
          </div>
            
            :
            (active===2)
            ?
            <div className="bodyTitle">
            Practice Room
          </div>
            :
            
            <div className="bodyTitle">
            Welcome, <span className='orange-text'>Ssaem</span>
          </div>
          }


          

          <div className="bodyContent">

            {active === 1 
            ?
            <div className="content ">
            <Notification/>
            </div>
            
            :
            (active===0)
            ?
            <div className="content">
            <Dashboard/>
            </div>
            :
            
            ""
           }
            
          </div>
          
          
          </div>
        </div>

        
      
    </div>
  )
}

export default HomeTeacher
