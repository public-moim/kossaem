import React, {useState, useRef} from 'react'
import { IoMdSend} from "react-icons/io";
import { Link } from 'react-router-dom';
function ChatPageT() {
  const [chat, setChat] =useState();
  const chatRef = useRef()

  const submitHandler= async (e) => {
    e.preventDefault()

    setChat(chatRef.current.value)

    chatRef.current.value=''
  }
  console.log(chat)
  return (
    <div className='chatRoom'>
        <nav>
          <ul>
     
            <li><Link to='/teacher' className='link'>Exit chat room</Link></li>
          </ul>
        </nav>

        <div className="main">
            <div className="sideMenu">
                <div className="profiles">
                    <div className="profPict"></div>
                    <div className="profile">
                        <p className="username">Ssaem-nim</p>
                        <p className="point">1,000P</p>
                    </div>

                   
            
                </div>
                <div className="menu">
                <div className="profiles-small">
                    <div className="profPict-small"></div>
                    <div className="profile">
                        <p className="username">syahri</p>
                        
                    </div>
            
                </div>
                </div>
          </div>
          <div className="body">
            <div className="chatRoomBody">
                <div className="chatRoomName">
                    syahri
                </div>
                <div className="chatRoomChat">
                    <div className="msgOther">
                        <div className="content">
                        안녕하세요!
                        </div>
                        
                    </div>
                    <div className="msgYours">
                        <div className="content">
                        안녕하세요!
                        </div>
                    </div>

                    <div className="msgYours">
                        <div className="content">
                        저는 샤리라고합니다!
                        </div>
                    </div>

                    <div className="msgOther">
                        <div className="content">
                        반가워요 샤리씨~
                        </div>
                        
                    </div>
                    <div className="msgOther">
                        <div className="content">
                        저는 최태영이에요~!
                        </div>
                        
                    </div>

                    <div className="msgOther">
                        <div className="content">
                        저는 최태영이에요~!
                        </div>
                        
                    </div>

                    <div className="msgOther">
                        <div className="content">
                        저는 최태영이에요~!
                        </div>
                        
                    </div>

                    <div className="msgOther">
                        <div className="content">
                        저는 최태영이에요~!
                        </div>
                        
                    </div>

                    <div className="msgOther">
                        <div className="content">
                        저는 최태영이에요~!
                        </div>
                        
                    </div>

                    

                    

                    <div className="msgYours">
                        <div className="content">
                        알았어요 ㅋㅋㅋ 왜케 많이 보냈어요 ㅋㅋ 저한테 맘이 있죠 쌤?
                        
                        </div>
                    </div>


                    
                </div>

                <div className="chatRoomType">
                  <form onSubmit={submitHandler} className='chatTyping'>
                    <input ref={chatRef}></input>
                    <button className='chatSend' type='submit'><IoMdSend/></button>

                  </form>
                    
                </div>
            </div>
          </div>
            
        </div>
     
    </div>
  )
}

export default ChatPageT
