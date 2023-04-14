import React, {useState,useContext} from 'react'
import './Admin.css'
import { MdOutlinePlaylistAdd,MdOutlinePlaylistAddCheck } from "react-icons/md";
import bg from '../student/bg-2.png'
import AddQuiz from './AddQuiz';
import ListQuiz from './ListQuiz';
import logo from '../../logo.png'
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import Header from '../share/Header';
import LeftBar from '../share/LeftBar';
import { Outlet } from 'react-router-dom';
function Admin() {
  const {currentUser} = useContext(AuthContext)
    const [active, setActive] = useState(1)
    const [questions,setQuestions] = useState([])
    const logout = async () => {
      try {
        await axios.post('/api/auth/logout')
        localStorage.removeItem("user");
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
      
    }

    const params = window.location.pathname
 
    
  return (
    <div className='studentContainer admin'>
      {/* <img className='logo' src={logo} onClick={()=> setActive(0)}></img>
      <nav>
          <ul>
            <li>Hi, {currentUser.username}</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </nav> */}

        <Header params={params}/>
        <div className="main flex">
          <LeftBar/>
          <div className="bodyContent">
          <Outlet/>
          </div>
          
          
          
        </div>

        {/* <div className="main" style={{ backgroundImage: `url(${bg})` }}>
            <div className="sideMenu">
           

                <div className="menu">
                    <div className={active === 1 ? "item active": "item"} onClick={()=>setActive(1)}><span className='icon'><MdOutlinePlaylistAdd/></span>
                    Add Quiz</div>

                    <div className={active ===2? "item active": "item"} onClick={()=>setActive(2)}><span className='icon'><MdOutlinePlaylistAddCheck/></span>
                    Quiz List</div>
                </div>
            </div>

            <div className="body">
          {active === 1 
            ?
            <div className="bodyTitle">
            Add Quiz
          </div>
            
            :
            (active===2)
            ?
            <div className="bodyTitle">
            Quiz List
          </div>
            :
            ""}


          

          <div className="bodyContent">

            {active === 1 
            ?
            <div className="content ">
            <AddQuiz/>
            </div>
            
            :
            (active===2)
            ?
            <div className="content ">
            <ListQuiz setActive={setActive} setQuestions={setQuestions}/>
            </div>
            // :
            // (active===3)
            // ?
            // <div className='content '>
            // <QuestionDetails questions={questions} setActive={setActive}/>
            // </div>
            :
            ""}
            
          </div>
          
          
          </div>


        </div> */}
    </div>
  )
}

export default Admin
