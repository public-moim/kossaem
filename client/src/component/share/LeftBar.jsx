import React, { useState, useContext, useEffect } from 'react'
import { MdOutlinePlaylistAdd,MdOutlinePlaylistAddCheck } from "react-icons/md";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { IoIosNotificationsOutline, IoIosSettings } from "react-icons/io";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import { RiChatSmile3Line} from "react-icons/ri";
import { ImFilesEmpty } from "react-icons/im";
function LeftBar({point}) {
    const [active,setActive] = useState()
    const navigate = useNavigate()
    const params = window.location.pathname
    const {currentUser} = useContext(AuthContext)
    const clickeHandler_1 = () => {
        setActive(1)
        if(params.includes('admin')){
            
            navigate('/admin/addquiz')
        } else if(params.includes('student')){
            navigate(`/student/${currentUser.id}/game`)
        }

        
    }

    const clickeHandler_2 = () => {
        setActive(2)
        if(params.includes('admin')){
            navigate('/admin/list')
        }
        else if(params.includes('student')){
            navigate(`/student/${currentUser.id}/chats`)
        }
        
    }
    const clickeHandler_3 = () => {
        setActive(3)
        navigate(`/student/${currentUser.id}/records`)
    }

   
    

    useEffect(()=> {
        if (!window.location.pathname.includes('game') || 
    !window.location.pathname.includes('chats') ||
    !window.location.pathname.includes('records')){
       setActive(0)
    }
    }    

    ,[active])

    

    
  return (
    <div className="sideMenu">
        {
            params.includes('admin')
            ?
            <div className="menu">

        <div className={active === 1 ? "item active": "item"} onClick={clickeHandler_1}><span className='icon'><MdOutlinePlaylistAdd/></span>
            Add Quiz</div>

            
            
            <div className={active ===2? "item active": "item"} onClick={clickeHandler_2}><span className='icon'><MdOutlinePlaylistAddCheck/></span>
            Quiz List</div>

            
        </div>
        :
        params.includes('student')
        ?
        <div className="menu">
            <div className="profiles">
                <div className="profPict">
                    <div className="profPict-edit">
                        <IoIosSettings />
                    </div>
                </div>
                <div className="profile">
                    <p className="username">{currentUser.username}-nim</p>
                    <p className="point">{point}P</p>
                </div>
                {/* <div className="icon"><IoIosSettings/></div> */}
            </div>
            
            <div className="menu-item">
            <div className={active === 1 ? "item active" : "item"} onClick={clickeHandler_1}><span className='icon'><HiOutlinePuzzlePiece /></span>
                Quiz time!</div>



            <div className={active === 2 ? "item active" : "item"} onClick={clickeHandler_2}><span className='icon'><RiChatSmile3Line /></span>
                Practice Korean</div>

            <div className={active === 3 ? "item active" : "item"} onClick={clickeHandler_3}><span className='icon'><ImFilesEmpty /></span>
                My Study Record</div>
            </div>

            

        </div>
        :
        ""

        }
        
    </div>
  )
}

export default LeftBar
