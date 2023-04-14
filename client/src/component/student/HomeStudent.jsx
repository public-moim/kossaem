import React, {useContext, useEffect, useState} from 'react'

import Header from '../share/Header'
import './Student.css'

import bg from './bg-2.png'
import { Link } from 'react-router-dom'
import QuestionDetails from '../admin/QuestionDetails'
import axios from 'axios'
import logo from '../../logo.png'
import { AuthContext } from '../../context/authContext'
import LeftBar from '../share/LeftBar';
import { Outlet } from 'react-router-dom';

function HomeStudent() {
  const [active, setActive] = useState(0)
  const [questions,setQuestions] = useState([])
  const [point,setPoint] = useState(0)
  const {currentUser} = useContext(AuthContext)
  const params = window.location.pathname
  const user_id= JSON.parse(localStorage.getItem('user')).id
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout')
      localStorage.removeItem("user");
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }



  const fetch = async () => {
    const res = await axios.get(`/api/quiz/record/${user_id}`)
    
    let point=0

    res.data.forEach(function(item){
      point=point +item.point_earned
    })
    setPoint(point)
  }
  

  useEffect(()=> {
fetch()
  },[])


  return (
    <div className='studentContainer'>

    <Header params={params}/>
    <div className="main flex">
          <LeftBar point={point}/>
          <div className="bodyContent">
          <Outlet />
          </div>



        </div>

        {/* <nav>
        <img className='logo' src={logo} onClick={()=> setActive(0)}></img>
          <ul>
            <li className='icon'><IoIosNotificationsOutline/> <span className='red-dot'></span></li>
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
            <div className={active === 1 ? "item active": "item"} onClick={()=>setActive(1)}><span className='icon'><HiOutlinePuzzlePiece/></span>
            Solve Quiz</div>

            <div className={active ===2? "item active": "item"} onClick={()=>setActive(2)}><span className='icon'><RiChatSmile3Line/></span>
            Practice Korean</div>

            <div className={active ===3? "item active": "item"} onClick={()=>setActive(3)}><span className='icon'><ImFilesEmpty/></span>
            My Record</div>


          </div>
          </div>

          <div className="body">
          {active === 1
            ?
            <div className="bodyTitle">
            Quiz time!
          </div>

            :
            (active===2)
            ?
            <div className="bodyTitle">
            Practice your Korean with Native speaker
          </div>
            :
            (active===3)
            ?
            <div className="bodyTitle">
            My Study Record
          </div>
            :
            (active===0)
            ?
            <div className="bodyTitle">
            Welcome, <span className='orange-text'>Syahri</span>
          </div>
          :
          <div className="bodyTitle">
           Details
          </div>}




          <div className="bodyContent">

            {active === 1
            ?
            <div className="content ">
            <QuizPlay/>
            </div>

            :
            (active===2)
            ?
            <div className="content ">
            <Chat/>
            </div>
            :
            (active===3)
            ?
            <div className="content ">
            <Record setActive={setActive} setQuestions={setQuestions}/>
            </div>
            :
            (active===0)
            ?
            <div className="content">
            <Dashboard/>
            </div>
            :
            <div className="content">
            <QuestionDetails questions={questions}/>
            </div>}

          </div>


          </div>
        </div> */}



    </div>
  )
}

export default HomeStudent
